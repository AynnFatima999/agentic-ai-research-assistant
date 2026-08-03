export type SummaryLength = "short" | "medium" | "long";

export interface Reference {
  title: string;
  url: string;
}

export interface ResearchRequest {
  topic: string;
  summary_length: SummaryLength;
}

export interface ResearchResponse {
  topic: string;
  summary: string;
  key_points: string[];
  references: Reference[];
}

export interface ProgressEvent {
  progress: number;
  message: string;
}

export interface ResearchState {
  topic: string;
  summaryLength: SummaryLength;
  isRunning: boolean;
  progress: number;
  progressMessage: string;
  result: ResearchResponse | null;
  error: string | null;
}