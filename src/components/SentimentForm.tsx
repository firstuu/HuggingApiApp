import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import { API_URL, MAX_TEXT_LENGTH } from '../constants/sentiment';
import { SentimentResult } from '../types/sentiment';

interface IFormInput {
  text: string;
}

const SentimentForm = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [result, setResult] = React.useState<SentimentResult>({ label: 'neutral', score: 0 });
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const fetchSentimentAnalysis = async (text: string): Promise<SentimentResult[] | null> => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({ text }),
      });

      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
      setError(error as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError(null);
    const results = await fetchSentimentAnalysis(data.text);
    if (results && results.length > 0) {
      setResult(results[0]);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto lg:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('text', {
              required: true,
              maxLength: MAX_TEXT_LENGTH,
            })}
            type="text"
            placeholder="Enter text for analysis..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent shadow-sm"
            disabled={isLoading}
          />
          {errors.text?.type === 'required' && (
            <p className="text-red-500 text-sm mt-1">Text is required</p>
          )}
          {errors.text?.type === 'maxLength' && (
            <p className="text-red-500 text-sm mt-1">
              Maximum length is {MAX_TEXT_LENGTH} characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-indigo-500 text-white px-4 py-2 rounded-md
                     transition-all duration-200 ease-in-out
                     ${
                       isLoading
                         ? 'opacity-50 cursor-not-allowed'
                         : 'hover:bg-indigo-600 active:bg-indigo-700'
                     }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">An error occurred. Please try again.</p>
        )}
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        label={result.label}
        score={result.score}
      />
    </div>
  );
};
export default SentimentForm;
