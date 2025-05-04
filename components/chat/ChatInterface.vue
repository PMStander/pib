<template>
  <NeumorphicCard title="AI Chat Assistant" variant="flat" class="mb-8">
    <div class="flex flex-col h-[500px]">
      <!-- Connection Status -->
      <div v-if="connectionStatus !== 'Connected'" class="bg-[rgb(var(--color-neumorphic-accent))/10] text-[rgb(var(--color-neumorphic-text))/70] text-xs p-2 rounded-lg mb-2 flex items-center">
        <div class="w-2 h-2 rounded-full mr-2" :class="connectionStatus === 'Connecting...' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'"></div>
        {{ connectionStatus }}
      </div>

      <!-- Chat Messages -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 nm-pressed rounded-lg mb-4"
      >
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full">
          <svg class="w-12 h-12 text-[rgb(var(--color-neumorphic-text))/30]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <p class="mt-4 text-[rgb(var(--color-neumorphic-text))/70] text-center">
            Start a conversation with the AI assistant to find partners, search profiles, or get recommendations.
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'max-w-[85%] rounded-lg p-3',
              message.sender === 'user'
                ? 'ml-auto nm-flat bg-[rgb(var(--color-neumorphic-accent))/10] text-[rgb(var(--color-neumorphic-text))]'
                : 'mr-auto nm-flat bg-[rgb(var(--color-neumorphic-bg))] text-[rgb(var(--color-neumorphic-text))]'
            ]"
          >
            <!-- Regular text message -->
            <div v-if="!message.hasResults && !message.documentArtifact" class="text-sm">
              {{ message.text }}
            </div>

            <!-- Document artifact message -->
            <div v-else-if="message.documentArtifact" class="text-sm">
              <div class="mb-3">{{ message.text }}</div>
              <DocumentPreview
                :document="message.documentArtifact"
                @view="openDocument(message.documentArtifact)"
                @copy="copyDocumentContent(message.documentArtifact)"
              />
            </div>

            <!-- Message with search results -->
            <div v-else>
              <div class="text-sm mb-3">{{ message.text }}</div>

              <!-- Profile Results -->
              <div v-if="message.profileResults && message.profileResults.length > 0" class="mt-4">
                <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70] mb-2">
                  Profiles
                </div>

                <div
                  v-for="(result, resultIndex) in message.profileResults"
                  :key="'profile-' + resultIndex"
                  class="nm-flat p-3 rounded-lg mb-2 text-xs"
                >
                  <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full nm-flat flex items-center justify-center mr-2">
                      <span v-if="result.item.avatarUrl" class="w-full h-full">
                        <img :src="result.item.avatarUrl" alt="Profile" class="w-full h-full object-cover rounded-full" />
                      </span>
                      <span v-else class="text-sm font-bold text-[rgb(var(--color-neumorphic-accent))]">
                        {{ result.item.name.charAt(0) }}
                      </span>
                    </div>
                    <div>
                      <h5 class="font-medium text-[rgb(var(--color-neumorphic-text))]">
                        {{ result.item.name }}
                      </h5>
                      <p v-if="result.item.bio" class="text-xs text-[rgb(var(--color-neumorphic-text))/70]">
                        {{ truncate(result.item.bio, 80) }}
                      </p>
                      <div class="mt-1 text-xs text-[rgb(var(--color-neumorphic-accent))]">
                        Match score: {{ Math.round(result.distance * 100) }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Business Results -->
              <div v-if="message.businessResults && message.businessResults.length > 0" class="mt-4">
                <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70] mb-2">
                  Businesses
                </div>

                <div
                  v-for="(result, resultIndex) in message.businessResults"
                  :key="'business-' + resultIndex"
                  class="nm-flat p-3 rounded-lg mb-2 text-xs"
                >
                  <h5 class="font-medium text-[rgb(var(--color-neumorphic-text))]">
                    {{ result.item.name }}
                  </h5>
                  <div class="flex gap-2 text-xs text-[rgb(var(--color-neumorphic-text))/70] mt-1">
                    <span v-if="result.item.industry">{{ result.item.industry }}</span>
                    <span v-if="result.item.location">• {{ result.item.location }}</span>
                  </div>
                  <p v-if="result.item.description" class="text-xs text-[rgb(var(--color-neumorphic-text))/70] mt-1">
                    {{ truncate(result.item.description, 100) }}
                  </p>
                  <div class="mt-1 text-xs text-[rgb(var(--color-neumorphic-accent))]">
                    Match score: {{ Math.round(result.distance * 100) }}%
                  </div>
                </div>
              </div>

              <!-- Partner Preference Results -->
              <div v-if="message.preferenceResults && message.preferenceResults.length > 0" class="mt-4">
                <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70] mb-2">
                  Partner Preferences
                </div>

                <div
                  v-for="(result, resultIndex) in message.preferenceResults"
                  :key="'pref-' + resultIndex"
                  class="nm-flat p-3 rounded-lg mb-2 text-xs"
                >
                  <div class="space-y-1">
                    <div v-if="result.item.industries && result.item.industries.length">
                      <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]">Industries</div>
                      <div class="flex flex-wrap gap-1 mt-1">
                        <span
                          v-for="(industry, i) in result.item.industries"
                          :key="i"
                          class="px-2 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70]"
                        >
                          {{ industry }}
                        </span>
                      </div>
                    </div>

                    <div v-if="result.item.skillsNeeded && result.item.skillsNeeded.length">
                      <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]">Skills Needed</div>
                      <div class="flex flex-wrap gap-1 mt-1">
                        <span
                          v-for="(skill, i) in result.item.skillsNeeded"
                          :key="i"
                          class="px-2 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-accent))/70]"
                        >
                          {{ skill }}
                        </span>
                      </div>
                    </div>

                    <div class="mt-1 text-xs text-[rgb(var(--color-neumorphic-accent))]">
                      Match score: {{ Math.round(result.distance * 100) }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex items-center space-x-2 mt-4">
          <div class="w-2 h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))] animate-bounce"></div>
          <div class="w-2 h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))] animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))] animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="flex">
        <NeumorphicInput
          v-model="newMessage"
          placeholder="Type your message..."
          class="flex-1 mr-2"
          @keyup.enter="sendMessage"
        />
        <NeumorphicButton
          variant="convex"
          color="primary"
          :disabled="!newMessage.trim() || isLoading"
          @click="sendMessage"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </NeumorphicButton>
      </div>
    </div>
  </NeumorphicCard>

  <!-- Document Modal -->
  <DocumentModal
    v-model="showDocumentModal"
    :document="selectedDocument"
    @update="updateDocument"
    @polish="requestDocumentPolish"
    @suggest="requestDocumentSuggestions"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import DocumentPreview from '~/components/chat/DocumentPreview.vue';
import DocumentModal from '~/components/chat/DocumentModal.vue';
import { useChat } from '~/composables/useChat';
import { useChatAgency } from '~/composables/useChatAgency';
import type { ChatMessage } from '~/types/chat';
import type { DocumentArtifact } from '~/types/documents';

// Chat state
const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const connectionStatus = ref<string>('Connecting...');

// Document state
const showDocumentModal = ref(false);
const selectedDocument = ref<DocumentArtifact>({
  id: '',
  title: '',
  content: '',
  format: 'markdown',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Get chat composable
const { messages, isLoading, sendMessage: sendChatMessage, error } = useChat();

// Import useChatAgency directly to access connection state
const { connectionState } = useChatAgency();

// Update connection status based on connectionState
watch(() => connectionState.value.isConnected, (isConnected) => {
  connectionStatus.value = isConnected ? 'Connected' : 'Disconnected';

  if (connectionState.value.error) {
    connectionStatus.value = `Error: ${connectionState.value.error}`;
  }
});

// Send a message
const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return;

  // Check if the message is a command
  if (parseCommands(newMessage.value)) {
    newMessage.value = '';
    return;
  }

  await sendChatMessage(newMessage.value);
  newMessage.value = '';
};

// Helper function to truncate text
function truncate(text: string | null | undefined, length: number): string {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

// Scroll to bottom when new messages arrive
watch(() => messages.value.length, async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
});

// Document-related methods
const openDocument = (document: DocumentArtifact) => {
  selectedDocument.value = { ...document };
  showDocumentModal.value = true;
};

const copyDocumentContent = async (document: DocumentArtifact) => {
  try {
    await navigator.clipboard.writeText(document.content);
    console.log('Document content copied to clipboard');
    // You could add a toast notification here
  } catch (error) {
    console.error('Failed to copy document content:', error);
  }
};

const updateDocument = (document: DocumentArtifact) => {
  // Find the message with this document and update it
  const messageIndex = messages.value.findIndex(
    (msg) => msg.documentArtifact && msg.documentArtifact.id === document.id
  );

  if (messageIndex !== -1) {
    messages.value[messageIndex].documentArtifact = { ...document };

    // Send update to server
    sendDocumentUpdate(document);
  }
};

const requestDocumentPolish = (document: DocumentArtifact) => {
  // Send a message to request document polishing
  sendChatMessage(`/document polish ${document.id}`);
  showDocumentModal.value = false;
};

const requestDocumentSuggestions = (document: DocumentArtifact) => {
  // Send a message to request document suggestions
  sendChatMessage(`/document suggest ${document.id}`);
  showDocumentModal.value = false;
};

const sendDocumentUpdate = (document: DocumentArtifact) => {
  // This would be implemented in useChatAgency.ts
  // For now, we'll just log it
  console.log('Sending document update:', document);
};

// Parse commands in the message input
const parseCommands = (text: string): boolean => {
  // Document creation command: /document create [title]
  const createMatch = text.match(/^\/document create (.+)$/i);
  if (createMatch) {
    const title = createMatch[1];
    sendChatMessage(`Creating a new document titled "${title}"...`);
    return true;
  }

  // Document editing command: /document edit [id]
  const editMatch = text.match(/^\/document edit (.+)$/i);
  if (editMatch) {
    const id = editMatch[1];
    const message = messages.value.find(
      (msg) => msg.documentArtifact && msg.documentArtifact.id === id
    );

    if (message && message.documentArtifact) {
      openDocument(message.documentArtifact);
    } else {
      sendChatMessage(`Could not find a document with ID ${id}`);
    }
    return true;
  }

  return false;
};

// Scroll to bottom on mount
onMounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }

  // Add a welcome message if no messages exist
  if (messages.value.length === 0) {
    messages.value.push({
      id: 'welcome',
      text: 'Hello! I\'m your AI assistant for Partners in Biz. I can help you find potential business partners, search profiles, or get recommendations. I can also create and edit documents for you. Try typing "/document create [title]" to create a new document.',
      sender: 'ai',
      timestamp: new Date()
    });
  }
});
</script>

<style scoped>
/* Custom scrollbar for the messages container */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(var(--color-neumorphic-text), 0.2);
  border-radius: 20px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--color-neumorphic-text), 0.3);
}
</style>
