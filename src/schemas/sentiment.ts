import { z } from 'zod';

export const SentimentLabelEnum = z.enum(['positive', 'negative', 'neutral']);

export const SentimentResultSchema = z.object({
  label: SentimentLabelEnum,
  score: z.number().min(0).max(1),
});

export const FormInputSchema = z.object({
  text: z
    .string()
    .min(1, 'Text is required')
    .max(500, 'Maximum length is 500 characters')
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      message: 'Text cannot be empty or contain only whitespace',
    }),
});

export type FormInput = z.infer<typeof FormInputSchema>;
