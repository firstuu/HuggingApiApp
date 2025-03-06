import { FormInputSchema, SentimentResultSchema } from '../../schemas/sentiment';

describe('Form Input Schema', () => {
  it('validates correct input', () => {
    const validInput = { text: 'Valid text' };
    const result = FormInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects empty text', () => {
    const emptyInput = { text: '' };
    const result = FormInputSchema.safeParse(emptyInput);
    expect(result.success).toBe(false);
  });

  it('rejects too long text', () => {
    const longInput = { text: 'a'.repeat(501) };
    const result = FormInputSchema.safeParse(longInput);
    expect(result.success).toBe(false);
  });

  it('trims whitespace from input', () => {
    const input = { text: '  test  ' };
    const result = FormInputSchema.parse(input);
    expect(result.text).toBe('test');
  });
});

describe('Sentiment Result Schema', () => {
  it('validates correct sentiment result', () => {
    const validResult = {
      label: 'positive',
      score: 0.95,
    };
    const result = SentimentResultSchema.safeParse(validResult);
    expect(result.success).toBe(true);
  });

  it('rejects invalid label', () => {
    const invalidLabel = {
      label: 'invalid',
      score: 0.5,
    };
    const result = SentimentResultSchema.safeParse(invalidLabel);
    expect(result.success).toBe(false);
  });

  it('rejects invalid score range', () => {
    const invalidScore = {
      label: 'positive',
      score: 1.5,
    };
    const result = SentimentResultSchema.safeParse(invalidScore);
    expect(result.success).toBe(false);
  });
});
