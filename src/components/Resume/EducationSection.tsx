import { FiBook, FiPlus, FiTrash2 } from 'react-icons/fi';

interface EducationSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const EducationSection = ({
  formData,
  setFormData
}: EducationSectionProps) => {
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: '',
          institution: '',
          startDate: '',
          endDate: ''
        }
      ]
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_: any, i: number) => i !== index)
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiBook className="text-blue-600" />
          <span>Education</span>
        </h2>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {formData.education.length > 0 ? (
        <div className="space-y-4">
          {formData.education.map((edu: any, index: number) => (
            <div
              key={index}
              className="group p-6 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Education #{index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(index)}
                  className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Remove"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, 'degree', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, 'institution', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="University Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(index, 'startDate', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., 2019"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(index, 'endDate', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., 2023 or Present"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
          <FiBook className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No education added yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Click "Add" to get started
          </p>
        </div>
      )}
    </div>
  );
};
