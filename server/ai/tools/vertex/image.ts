import { VertexAI } from '@google-cloud/vertexai';
import { promises as fs } from 'fs';

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

export async function generateImage(
  projectId: string,
  location: string,
  model: string = 'imagegeneration@005',
  prompt: string,
  negativePrompt: string = '',
  sampleCount: number = 1,
  width: number = 1024,
  height: number = 1024,
  style: string = 'photographic'
) {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  // Initialize Vertex AI
  const vertexAI = new VertexAI({ project: projectId, location: location });
  const generativeModel = vertexAI.getGenerativeModel({ model: model });

  // Create generation parameters
  const generationParams = {
    sampleCount,
    negativePrompt: negativePrompt || undefined,
    aspect_ratio: getAspectRatio(width, height)
  };

  if (style) {
    generationParams['style'] = style;
  }

  // Create the request
  const request = {
    prompt: {
      prompt: prompt,
    },
    parameters: generationParams
  };

  try {
    // Generate the image
    const response = await generativeModel.generateImages(request);
    
    // Extract images from the response
    const images = response.images.map(img => {
      return {
        base64: img.base64,
        mimeType: 'image/png'
      };
    });
    
    return images;
  } catch (error) {
    console.error('Error generating images with Vertex AI:', error);
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
