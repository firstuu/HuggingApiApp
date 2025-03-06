import { z } from 'zod';
import { SentimentLabelEnum, SentimentResultSchema, FormInputSchema } from '../schemas/sentiment';

export type SentimentLabel = z.infer<typeof SentimentLabelEnum>;
export type SentimentResult = z.infer<typeof SentimentResultSchema>;
export type FormInput = z.infer<typeof FormInputSchema>;

export interface SentimentInfo {
  emoji: string;
  description: string;
  tip: string;
}
