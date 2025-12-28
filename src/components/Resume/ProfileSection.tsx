import { FiUser } from 'react-icons/fi';

interface ProfileSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ProfileSection = ({
  formData,
  setFormData
}: ProfileSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
        <FiUser className="text-blue-600" />
        <span>Profile Information</span>
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.profileInfo.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              profileInfo: { ...formData.profileInfo, fullName: e.target.value }
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Professional Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.profileInfo.designation}
          onChange={(e) =>
            setFormData({
              ...formData,
              profileInfo: {
                ...formData.profileInfo,
                designation: e.target.value
              }
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Senior Software Engineer"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Professional Summary
        </label>
        <textarea
          value={formData.profileInfo.summary}
          onChange={(e) =>
            setFormData({
              ...formData,
              profileInfo: { ...formData.profileInfo, summary: e.target.value }
            })
          }
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="A brief summary of your professional background, key skills, and career objectives..."
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Tip: Keep it concise and highlight your most impressive achievements
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Image URL{' '}
          <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <input
          type="url"
          value={formData.profileInfo.profilePreviewUrl || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              profileInfo: {
                ...formData.profileInfo,
                profilePreviewUrl: e.target.value
              }
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="https://example.com/profile.jpg"
        />
      </div>
    </div>
  );
};
