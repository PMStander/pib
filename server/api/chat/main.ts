import type { Peer } from "crossws";
import { defineWebSocketHandler, getQuery } from "h3";
import { createWorkflow, SupervisorResponseSchema } from "../../ai/teams/test";
import logger from "../../ai/logger";

interface ChatMessage {
  type: 'message' | 'system' | 'error' | 'human_feedback' | 'state_update' | 'init';
  content: string;
  message?: string;
  agency?: string;
  timestamp?: string;
  userId?: string;
  context?: any;
  data?: {
    message: {
      id: string;
      role: string;
      content: string;
      type: string;
      text: string;
      time: string;
      attachments: any[];
    };
    modelConfig?: {
      topK: number;
      temperature: number;
      model: string;
      topP: number;
      maxOutputTokens: number;
    };
    functionGroups?: string[];
    systemInstruction?: string;
    customInstructions?: string;
    [key: string]: any;
  };
}

// Store user information and conversation threads
const users = new Map<string, { online: boolean }>();
// Store thread IDs for each peer to maintain conversation context
const peerThreads = new Map<string, string>();
// Store message history for each peer
const peerMessages = new Map<string, Array<{ role: string, content: string }>>();
const DEFAULT_ROOM = "AI_AGENCY";

// Helper function to get user ID from query parameters
function getUserId(peer: Peer): string {
  const url = peer.request?.url || '';
  const query = getQuery(url);
  const userId = query.userId;
  return typeof userId === 'string' ? userId : (Array.isArray(userId) ? userId[0] : 'anonymous');
}

// Helper function to get or create a thread ID for a peer
function getThreadId(peerId: string): string {
  if (!peerThreads.has(peerId)) {
    peerThreads.set(peerId, `thread_${peerId}_${Date.now()}`);
  }
  return peerThreads.get(peerId)!;
}

// Helper function to manage message history
function updateMessageHistory(peerId: string, message: { role: string, content: string }): Array<{ role: string, content: string }> {
  if (!peerMessages.has(peerId)) {
    peerMessages.set(peerId, []);
  }

  const messages = peerMessages.get(peerId)!;
  messages.push(message);

  // Keep only the last 10 messages to prevent the context from getting too large
  if (messages.length > 10) {
    peerMessages.set(peerId, messages.slice(-10));
  }

  return peerMessages.get(peerId)!;
}


export default defineWebSocketHandler({
  async open(peer) {
    console.log(`[WebSocket] Peer connected: ${peer.id}`);
    // Send a welcome message to the client
    peer.send(JSON.stringify({ status: "connected", message: "WebSocket connection established" }));
  },

  async message(peer, message) {
    try {
      console.log("MESSAGE--------->: ", message)
      if (!message) return;

      // Handle Buffer data
      let rawMessageContent: string;
      if (message instanceof Buffer) {
        rawMessageContent = message.toString('utf-8');
      } else if (message.data instanceof Buffer) {
        rawMessageContent = message.data.toString('utf-8');
      } else {
        rawMessageContent = typeof message === 'string' ? message : message.toString();
      }

      console.log("RAW MESSAGE--------->: ", rawMessageContent)

      logger.info({ message: `Received message for Agency: ${rawMessageContent}` }, peer);

      // Handle heartbeat messages
      if (rawMessageContent === 'ping') {
        try {
          peer.send('pong');
          return;
        } catch (sendError) {
          logger.error({ message: 'Error sending pong response', error: sendError }, peer);
          return;
        }
      }

      // Skip processing if not valid JSON
      if (!rawMessageContent.startsWith('{')) {
        console.log("[WebSocket] Skipping non-JSON message:", rawMessageContent);
        return;
      }

      // Parse the message
      const parsedMessage: ChatMessage = JSON.parse(rawMessageContent);
      console.log(`[WebSocket] Parsed message type: ${parsedMessage.type}`);

      // Handle initialization messages
      if (parsedMessage.type === 'init') {
        console.log("[WebSocket] Initialization message received");
        peer.send(JSON.stringify({
          type: 'system',
          message: 'Initialization successful',
          timestamp: new Date().toISOString()
        }));
        return;
      }

      // Handle user messages
      if (parsedMessage.type === 'message' && parsedMessage.data?.message) {
        const clientMessage = parsedMessage.data.message;
        const userText = clientMessage.text || clientMessage.content || '';

        console.log(`[WebSocket] Processing user message: ${userText}`);

        // Initialize the workflow
        const app = createWorkflow();

        // Get or create a thread ID for this peer to maintain conversation context
        const threadId = getThreadId(peer.id);

        // Update message history with the user's message
        const userMessageForHistory = { role: "user", content: userText };
        const messageHistory = updateMessageHistory(peer.id, userMessageForHistory);

        // Stream workflow responses with message history and thread_id
        const stream = await app.stream(
          { messages: messageHistory },
          {
            streamMode: "values",
            configurable: {
              thread_id: threadId
            }
          }
        );

        // Process streamed events and send validated responses to the client
        for await (const event of stream) {
          const messages = event.messages;
          if (messages && messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            if (latestMessage.content) {
              try {
                // Try to parse the response as JSON, but handle plain text responses too
                let parsedResponse;
                let responseContent;

                try {
                  // First try to parse as JSON and validate with zod
                  const jsonContent = JSON.parse(latestMessage.content);
                  parsedResponse = SupervisorResponseSchema.parse(jsonContent);
                  responseContent = JSON.stringify(parsedResponse);
                } catch (parseError) {
                  console.log("[WebSocket] Response is not valid JSON, treating as plain text");
                  // If it's not valid JSON, use the raw content as plain text
                  responseContent = latestMessage.content;

                  // Create a simplified response object that matches our schema
                  parsedResponse = {
                    task: "conversation",
                    result: responseContent,
                    agent: "assistant"
                  };
                }

                // Add the assistant's response to the message history
                updateMessageHistory(peer.id, {
                  role: "assistant",
                  content: responseContent
                });

                // Format the response as a chat message
                // For plain text responses, use the text directly
                // For JSON responses, use the formatted JSON string
                const displayContent = parsedResponse.result || responseContent;

                const responseMessage = {
                  type: 'message',
                  data: {
                    message: {
                      id: `response-${Date.now()}`,
                      role: 'assistant',
                      content: displayContent,
                      text: displayContent,
                      time: new Date().toLocaleTimeString(),
                      type: 'received',
                      attachments: []
                    }
                  }
                };

                // Log the response we're sending
                console.log(`[WebSocket] Sending response: ${displayContent.substring(0, 100)}${displayContent.length > 100 ? '...' : ''}`);

                // Send the validated response to the client
                peer.send(JSON.stringify(responseMessage));
              } catch (error) {
                console.error("[WebSocket] Validation Error:", error);
                peer.send(
                  JSON.stringify({
                    type: 'error',
                    message: "Invalid response format",
                    details: error.message
                  })
                );
              }
            }
          }
        }
      } else {
        console.log("[WebSocket] Unhandled message type:", parsedMessage.type);
        peer.send(JSON.stringify({
          type: 'error',
          message: 'Unsupported message type or format',
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error("[WebSocket] Error processing message:", error);
      peer.send(JSON.stringify({
        type: 'error',
        message: "Internal server error",
        details: error.message
      }));
    }
  },

  async close(peer) {
    console.log(`[WebSocket] Peer disconnected: ${peer.id}`);
    // Clean up resources when the peer disconnects
    peerThreads.delete(peer.id);
    peerMessages.delete(peer.id);
  },

  async error(peer, error) {
    console.error(`[WebSocket] Error for peer ${peer.id}:`, error);
    peer.send(JSON.stringify({
      type: 'error',
      message: "WebSocket error",
      details: error.message
    }));
  },
});