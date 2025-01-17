export const MESSAGE_TYPES = {
  SYSTEM: 'system',
  USER: 'user', 
  AI: 'ai',
  ERROR: 'error'
} as const;

export interface Message {
  id: number;
  type: keyof typeof MESSAGE_TYPES;
  text: string;
  timestamp: Date;
}

export interface ProjectAnalysisResult {
  message: string;
  status: 'success' | 'error';
  metadata?: Record<string, unknown>;
}

export interface ProjectAnalysisChatProps {
  maxMessages?: number;
  timeout?: number;
}
