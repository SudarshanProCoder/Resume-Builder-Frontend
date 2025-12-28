import { FiCode, FiPlus, FiTrash2 } from 'react-icons/fi';

interface SkillsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const SkillsSection = ({
  formData,
  setFormData
}: SkillsSectionProps) => {
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          name: '',
          progress: 50
        }
      ]
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_: any, i: number) => i !== index)
    });
  };

  const updateSkill = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...formData.skills];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, skills: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiCode className="text-blue-600" />
          <span>Skills</span>
        </h2>
        <button
          onClick={addSkill}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {formData.skills.length > 0 ? (
        <div className="space-y-4">
          {formData.skills.map((skill: any, index: number) => (
            <div
              key={index}
              className="group p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., React.js, Python, Leadership"
                />
                <button
                  onClick={() => removeSkill(index)}
                  className="p-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Remove"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Proficiency Level
                  </label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {skill.progress}%
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.progress}
                    onChange={(e) =>
                      updateSkill(index, 'progress', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                    style={{
                      background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${skill.progress}%, rgb(229, 231, 235) ${skill.progress}%, rgb(229, 231, 235) 100%)`
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
          <FiCode className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No skills added yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Click "Add" to showcase your expertise
          </p>
        </div>
      )}
    </div>
  );
};
