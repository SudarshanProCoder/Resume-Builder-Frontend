import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiLink
} from 'react-icons/fi';

interface ContactSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ContactSection = ({
  formData,
  setFormData
}: ContactSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
        <FiMail className="text-blue-600" />
        <span>Contact Information</span>
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
          <FiMail className="w-4 h-4" />
          <span>Email Address *</span>
        </label>
        <input
          type="email"
          value={formData.contactInfo.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactInfo: { ...formData.contactInfo, email: e.target.value }
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
          <FiPhone className="w-4 h-4" />
          <span>Phone Number</span>
        </label>
        <input
          type="tel"
          value={formData.contactInfo.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactInfo: { ...formData.contactInfo, phone: e.target.value }
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
          <FiMapPin className="w-4 h-4" />
          <span>Location</span>
        </label>
        <input
          type="text"
          value={formData.contactInfo.location}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactInfo: { ...formData.contactInfo, location: e.target.value }
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="New York, NY"
        />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Social Links
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
            <FiLinkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </label>
          <input
            type="url"
            value={formData.contactInfo.linkedIn}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactInfo: {
                  ...formData.contactInfo,
                  linkedIn: e.target.value
                }
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
            <FiGithub className="w-4 h-4" />
            <span>GitHub</span>
          </label>
          <input
            type="url"
            value={formData.contactInfo.github}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, github: e.target.value }
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="github.com/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
            <FiLink className="w-4 h-4" />
            <span>Website</span>
          </label>
          <input
            type="url"
            value={formData.contactInfo.website}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactInfo: {
                  ...formData.contactInfo,
                  website: e.target.value
                }
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="johndoe.com"
          />
        </div>
      </div>
    </div>
  );
};
