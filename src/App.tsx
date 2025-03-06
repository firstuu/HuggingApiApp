import SentimentForm from './components/SentimentForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sentiment Analysis</h1>
        <SentimentForm />
      </div>
    </div>
  );
}

export default App;
