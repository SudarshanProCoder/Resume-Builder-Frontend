import { useState } from 'react';
import { FiPlus, FiX, FiHeart } from 'react-icons/fi';

interface InterestsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const InterestsSection = ({
  formData,
  setFormData
}: InterestsSectionProps) => {
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_: any, i: number) => i !== index)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiHeart className="text-blue-600" />
          <span>Interests & Hobbies</span>
        </h2>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Type an interest and press Enter or click Add"
        />
        <button
          onClick={addInterest}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {formData.interests.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <FiHeart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            No interests added yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Add your hobbies, interests, or activities you enjoy
          </p>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-3 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#0D1117]">
            {formData.interests.map((interest: string, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all group"
              >
                <span>{interest}</span>
                <button
                  onClick={() => removeInterest(index)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: Include interests that showcase your personality or relate
            to your field
          </p>
        </div>
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Popular Interests:
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            'Photography',
            'Travel',
            'Reading',
            'Gaming',
            'Music',
            'Cooking',
            'Sports',
            'Technology',
            'Blogging',
            'Volunteering'
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!formData.interests.includes(suggestion)) {
                  setFormData({
                    ...formData,
                    interests: [...formData.interests, suggestion]
                  });
                }
              }}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-400 transition-all"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
