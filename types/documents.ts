/**
 * Document artifact types for the chat system
 */

// Document artifact types
export interface DocumentArtifact {
  id: string;
  title: string;
  content: string;
  format: 'text' | 'markdown' | 'html';
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

// Document suggestion for improving document content
export interface DocumentSuggestion {
  id: string;
  documentId: string;
  targetText: string;
  suggestedText: string;
  reason: string;
  position: {
    startIndex: number;
    endIndex: number;
  };
  applied: boolean;
}

// Document polish request
export interface DocumentPolishRequest {
  documentId: string;
  instructions?: string;
  focus?: 'grammar' | 'style' | 'clarity' | 'conciseness' | 'all';
}

// Document polish response
export interface DocumentPolishResponse {
  documentId: string;
  originalContent: string;
  polishedContent: string;
  changes: {
    description: string;
    count: number;
  }[];
}
