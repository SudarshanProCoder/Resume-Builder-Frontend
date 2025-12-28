import { FiBriefcase, FiPlus, FiTrash2 } from 'react-icons/fi';

interface WorkSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const WorkSection = ({ formData, setFormData }: WorkSectionProps) => {
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [
        ...formData.workExperiences,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    });
  };

  const removeWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperiences: formData.workExperiences.filter(
        (_: any, i: number) => i !== index
      )
    });
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updated = [...formData.workExperiences];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, workExperiences: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiBriefcase className="text-blue-600" />
          <span>Work Experience</span>
        </h2>
        <button
          onClick={addWorkExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {formData.workExperiences.length > 0 ? (
        <div className="space-y-4">
          {formData.workExperiences.map((exp: any, index: number) => (
            <div
              key={index}
              className="group p-6 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Experience #{index + 1}
                </h3>
                <button
                  onClick={() => removeWorkExperience(index)}
                  className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Remove"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role/Position
                </label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) =>
                    updateWorkExperience(index, 'role', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateWorkExperience(index, 'company', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., Tech Corp"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateWorkExperience(index, 'startDate', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., Jan 2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateWorkExperience(index, 'endDate', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., Present"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateWorkExperience(index, 'description', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Describe your responsibilities, achievements, and key contributions..."
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Tip: Use bullet points or action verbs to highlight
                  accomplishments
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
          <FiBriefcase className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No work experience added yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Click "Add" to showcase your professional journey
          </p>
        </div>
      )}
    </div>
  );
};
