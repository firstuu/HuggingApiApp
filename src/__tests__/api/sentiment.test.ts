import { fetchSentimentAnalysis } from '../../api/fetchSentiment';

describe('fetchSentimentAnalysis', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('returns sentiment analysis for valid input', async () => {
    const mockResponse = {
      label: 'positive',
      score: 0.95,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockResponse],
    });

    const result = await fetchSentimentAnalysis('Great day!');
    expect(result).toEqual(mockResponse);
  });

  it('validates response with Zod schema', async () => {
    const invalidResponse = {
      label: 'invalid',
      score: 2,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [invalidResponse],
    });

    await expect(fetchSentimentAnalysis('test')).rejects.toThrow();
  });
});
