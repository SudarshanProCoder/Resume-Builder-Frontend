import { FiPlus, FiTrash2, FiGlobe } from 'react-icons/fi';

interface LanguagesSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const LanguagesSection = ({
  formData,
  setFormData
}: LanguagesSectionProps) => {
  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        {
          name: '',
          progress: 50
        }
      ]
    });
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_: any, i: number) => i !== index)
    });
  };

  const updateLanguage = (index: number, field: string, value: any) => {
    const updated = [...formData.languages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, languages: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiGlobe className="text-blue-600" />
          <span>Languages</span>
        </h2>
        <button
          onClick={addLanguage}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Language</span>
        </button>
      </div>

      {formData.languages.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <FiGlobe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No languages added yet
          </p>
          <button
            onClick={addLanguage}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            Add Your First Language
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.languages.map((language: any, index: number) => (
            <div
              key={index}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#0D1117] space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Language {index + 1}
                </h3>
                <button
                  onClick={() => removeLanguage(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) =>
                    updateLanguage(index, 'name', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="English, Spanish, Hindi..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proficiency Level: {language.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={language.progress}
                  onChange={(e) =>
                    updateLanguage(index, 'progress', parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Native</span>
                </div>
              </div>

              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all rounded-full"
                  style={{ width: `${language.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
