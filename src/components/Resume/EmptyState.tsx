import { FiFileText, FiPlus } from 'react-icons/fi';

interface EmptyStateProps {
  onCreateResume: () => void;
}

const EmptyState = ({ onCreateResume }: EmptyStateProps) => {
  return (
    <div className="glass rounded-2xl p-12 text-center bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiFileText className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        No Resumes Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Create your first professional resume in minutes with our easy-to-use
        builder
      </p>
      <button
        onClick={onCreateResume}
        className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
      >
        <FiPlus className="w-5 h-5" />
        <span>Create Your First Resume</span>
      </button>
    </div>
  );
};

export default EmptyState;
