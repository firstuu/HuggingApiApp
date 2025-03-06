export interface SentimentResult {
  label: SentimentLabel;
  score: number;
}

export interface SentimentInfo {
  emoji: string;
  description: string;
  tip: string;
}

export type SentimentLabel = 'positive' | 'negative' | 'neutral';
