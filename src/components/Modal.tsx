import { SENTIMENT_INFO } from '../constants/sentiment';
import { SentimentInfo, SentimentLabel } from '../types/sentiment';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  label: SentimentLabel;
  score: number;
}

const ModalContent = ({
  label,
  score,
  sentimentInfo,
}: {
  label: string;
  score: number;
  sentimentInfo: SentimentInfo;
}) => (
  <div className="text-center">
    <div className="text-6xl mb-4">{sentimentInfo.emoji}</div>
    <h2 className="text-2xl font-bold mb-2">{label.charAt(0).toUpperCase() + label.slice(1)}</h2>
    <p className="text-gray-600 mb-4">Confidence: {Math.round(score * 100)}%</p>
    <div className="text-left bg-gray-50 p-4 rounded-lg">
      <p className="text-gray-700 mb-3">
        <span className="font-semibold">Analysis:</span> {sentimentInfo.description}
      </p>
      <p className="text-indigo-600">
        <span className="font-semibold">Pro tip:</span> {sentimentInfo.tip}
      </p>
    </div>
  </div>
);

const Modal = ({ isOpen, onRequestClose, label, score }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-5 sm:px-0">
      <div className="bg-white rounded-lg p-6 lg:p-8 max-w-md w-full">
        <ModalContent label={label} score={score} sentimentInfo={SENTIMENT_INFO[label]} />
        <button
          onClick={onRequestClose}
          className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-md 
                   hover:bg-indigo-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
