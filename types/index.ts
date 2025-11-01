// Core Types
export interface Message {
  id: number;
  text: string;
  sender: 'student' | 'ai';
  timestamp?: Date;
}

export interface DoubtData {
  doubt: string;
  subject: Subject;
}

export type Subject = 'Math' | 'Science' | 'English' | 'Social Studies';

export interface UserStats {
  doubtsResolved: number;
  currentStreak: number;
  subjectsMastered: Subject[];
}

export interface RecentDoubt {
  id: number;
  subject: Subject;
  topic: string;
  date: string;
  resolved: boolean;
}

export interface FeedbackData {
  rating: number;
  helpful: boolean | null;
  feedback: string;
}

export interface AIResponse {
  response: string;
  error?: string;
}

export interface ChatRequest {
  doubt: string;
  subject: Subject;
}
export interface ConceptVisualization {
  type: 'formula' | 'diagram' | 'mnemonic';
  content: string;
  explanation: string;
}