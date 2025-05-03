import { VertexAI } from '@google-cloud/vertexai';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';

async function getBase64FromFile(filepath: string) {
  try {
    const data = await fs.readFile(filepath);
    return data.toString('base64');
  } catch (error) {
    console.error(`Error reading file ${filepath}:`, error);
    throw new Error(`Failed to read file ${filepath}`);
  }
}

/**
 * TODO(developer): Update these variables before running the sample.
 */
export async function sendMultiModalPromptWithImage(
  projectId = 'PROJECT_ID',
  location = 'us-central1',
  model = 'gemini-1.5-flash-001',
  filepaths: string[],
  text: string
) {
  try {
    const images = await Promise.all(filepaths.map(filepath => getBase64FromFile(filepath)));

    const vertexAI = new VertexAI({ project: projectId, location: location });

    const generativeVisionModel = vertexAI.getGenerativeModel({ model: model });

    const request = {
      contents: [
        {
          role: 'user',
          parts: images.map(image => [
            {
              inlineData: {
                data: image,
                mimeType: 'image/jpeg', // Most screenshots will be JPEG
              },
            },
            {
              text: text,
            }
          ]).flat(),
        },
      ],
    };

    const response: any = await generativeVisionModel.generateContent(request);
    const aggregatedResponse: any = await response.response;

    const fullTextResponse = aggregatedResponse.candidates[0].content.parts
      .map((part: any) => part.text)
      .join('\n')
      .trim();
    
    const usageMetadata = {
      promptTokenCount: response.usageMetadata?.promptTokenCount || 0,
      candidatesTokenCount: response.usageMetadata?.candidatesTokenCount || 0,
      totalTokenCount: response.usageMetadata?.totalTokenCount || 0,
    };

    return {
      fullTextResponse,
      usageMetadata,
    };
  } catch (error) {
    console.error('[sendMultiModalPromptWithImage] Error:', error);
    throw new Error('Failed to generate content');
  }
}

interface ImageResponse {
  base64?: string;
  url?: string;
  mimeType: string;
}

/**
 * Generate an image using Vertex AI's Gemini Image Generation model
 * Following Gemini best practices for structured prompt formatting
 */
export async function generateImage(
  projectId: string,
  location: string,
  modelName: string,
  prompt: string,
  negativePrompt: string = '',
  sampleCount: number = 1,
  width: number = 1024,
  height: number = 1024,
  style: string = 'photographic'
): Promise<ImageResponse[]> {
  try {
    const vertexAI = new VertexAI({ project: projectId, location });
    const generativeVisionModel = vertexAI.preview.getGenerativeModel({
      model: modelName,
      generation_config: {
        temperature: 0.4, // Lower temperature for more predictable results
        max_output_tokens: 2048,
      },
      safety_settings: [
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    });

    // Prepare parameters following Gemini best practices
    const parameters = {
      sampleCount,
      negativePrompt,
      width,
      height,
      style,
    };

    // Log the request for debugging (remove in production)
    console.log('Generating image with prompt:', prompt);
    console.log('Parameters:', parameters);

    // Make the request to Vertex AI
    const imageResponse = await generativeVisionModel.generateImage({
      prompt,
      ...parameters,
    });

    // Process the response
    if (!imageResponse || !imageResponse.images) {
      throw new Error('No images generated');
    }

    return imageResponse.images.map(img => ({
      base64: img.base64, 
      mimeType: 'image/png'
    }));
  } catch (error) {
    console.error('Error in generateImage:', error);
    throw error;
  }
}

// Helper function to determine the aspect ratio
function getAspectRatio(width: number, height: number): string {
  if (width === height) {
    return '1:1';
  } else if (width === 1024 && height === 768) {
    return '4:3';
  } else if (width === 768 && height === 1024) {
    return '3:4';
  } else if (width === 1024 && height === 576) {
    return '16:9';
  } else if (width === 576 && height === 1024) {
    return '9:16';
  }
  
  // Default to square aspect ratio if no match
  return '1:1';
}

// Function to convert URL to base64
async function getBase64FromUrl(url: string): Promise<string> {
  try {
    // For server-side handling
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');
  } catch (error) {
    console.error('Error fetching image from URL:', error);
    throw new Error('Failed to convert URL to base64');
  }
}

/**
 * Edit an existing image using Vertex AI
 * Following Gemini API best practices for image editing
 */
export async function editImage(
  projectId: string,
  location: string,
  modelName: string,
  imageUrl: string,
  prompt: string,
  strength: number = 0.8,
  mask: string | null = null,
): Promise<ImageResponse> {
  try {
    // Download the image if it's a URL
    let imageData = imageUrl;
    if (imageUrl.startsWith('http')) {
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      imageData = `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${buffer.toString('base64')}`;
    }

    const vertexAI = new VertexAI({ project: projectId, location });
    const generativeVisionModel = vertexAI.preview.getGenerativeModel({
      model: modelName,
      generation_config: {
        temperature: 0.2, // Lower temperature for more predictable edits
      },
    });

    // Enhanced prompt structure for editing - following Gemini's best practices
    // Image content should come first in multimodal prompts
    const enhancedPrompt = `Edit the provided image according to these instructions:
${prompt}

Apply the changes with a strength of ${strength * 100}%`;

    // Prepare the request with the image and mask (if provided)
    const request = {
      image: imageData,
      prompt: enhancedPrompt,
      mask: mask,  // Mask for inpainting (optional)
      strength,
    };

    // Make the request to Vertex AI
    const result = await generativeVisionModel.editImage(request);

    if (!result || !result.image) {
      throw new Error('No edited image returned');
    }

    return {
      base64: result.image.base64,
      mimeType: result.image.mimeType || 'image/png'
    };
  } catch (error) {
    console.error('Error in editImage:', error);
    throw error;
  }
}
