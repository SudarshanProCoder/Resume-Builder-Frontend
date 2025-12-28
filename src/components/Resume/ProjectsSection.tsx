import { FiPlus, FiTrash2, FiFolder } from 'react-icons/fi';

interface ProjectsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ProjectsSection = ({
  formData,
  setFormData
}: ProjectsSectionProps) => {
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: '',
          description: '',
          github: '',
          liveDemo: ''
        }
      ]
    });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_: any, i: number) => i !== index)
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, projects: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiFolder className="text-blue-600" />
          <span>Projects</span>
        </h2>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {formData.projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <FiFolder className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No projects added yet
          </p>
          <button
            onClick={addProject}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.projects.map((project: any, index: number) => (
            <div
              key={index}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#0D1117] space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Project {index + 1}
                </h3>
                <button
                  onClick={() => removeProject(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    updateProject(index, 'title', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="E-commerce Platform"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, 'description', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Describe the project, technologies used, and your role..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={project.github}
                    onChange={(e) =>
                      updateProject(index, 'github', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={project.liveDemo}
                    onChange={(e) =>
                      updateProject(index, 'liveDemo', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
