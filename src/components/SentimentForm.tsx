import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import { SentimentResult } from '../types/sentiment';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInputSchema } from '../schemas/sentiment';
import type { FormInput } from '../schemas/sentiment';
import { fetchSentimentAnalysis } from '../api/fetchSentiment';

const SentimentForm = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [result, setResult] = React.useState<SentimentResult>({ label: 'neutral', score: 0 });
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  });

  const handleModalClose = () => setIsModalOpen(false);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await fetchSentimentAnalysis(data.text);
      setResult(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto lg:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('text')}
            type="text"
            placeholder="Enter text for analysis..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent shadow-sm"
            disabled={isLoading}
          />
          {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
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
