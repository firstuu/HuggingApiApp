import { SentimentLabel, SentimentInfo } from '../types/sentiment';

export const SENTIMENT_INFO: Record<SentimentLabel, SentimentInfo> = {
  positive: {
    emoji: '😊',
    description: 'The text expresses positive emotions, optimism, or approval.',
    tip: 'Keep up the positive energy!',
  },
  negative: {
    emoji: '😔',
    description: 'The text expresses negative emotions, pessimism, or disapproval.',
    tip: 'Consider reframing your perspective.',
  },
  neutral: {
    emoji: '😐',
    description: 'The text expresses a neutral or balanced sentiment.',
    tip: 'You can add more emotional context if desired.',
  },
};

export const API_URL =
  'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest';
