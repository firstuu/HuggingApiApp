import { SentimentResult } from '../types/sentiment';
import { SentimentResultSchema } from '../schemas/sentiment';
import { API_URL } from '../constants/sentiment';

export const fetchSentimentAnalysis = async (text: string): Promise<SentimentResult> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return SentimentResultSchema.parse(data[0]);
};
