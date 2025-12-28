import { FiPlus, FiTrash2, FiAward } from 'react-icons/fi';

interface CertificationsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const CertificationsSection = ({
  formData,
  setFormData
}: CertificationsSectionProps) => {
  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          title: '',
          issuer: '',
          year: ''
        }
      ]
    });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter(
        (_: any, i: number) => i !== index
      )
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = [...formData.certifications];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, certifications: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <FiAward className="text-blue-600" />
          <span>Certifications</span>
        </h2>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {formData.certifications.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <FiAward className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No certifications added yet
          </p>
          <button
            onClick={addCertification}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            Add Your First Certification
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.certifications.map((cert: any, index: number) => (
            <div
              key={index}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#0D1117] space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Certification {index + 1}
                </h3>
                <button
                  onClick={() => removeCertification(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certification Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) =>
                    updateCertification(index, 'title', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issuing Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertification(index, 'issuer', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) =>
                    updateCertification(index, 'year', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="2024"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
