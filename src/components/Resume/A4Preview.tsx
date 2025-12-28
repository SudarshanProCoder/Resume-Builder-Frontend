import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiLinkedin,
  FiGithub,
  FiLink
} from 'react-icons/fi';

interface A4PreviewProps {
  formData: any;
  selectedTheme: string;
  selectedPalette: { name: string; colors: string[] };
}

export const A4Preview = ({
  formData,
  selectedTheme,
  selectedPalette
}: A4PreviewProps) => {
  const [primaryColor, secondaryColor] = selectedPalette.colors;

  const profileInfo = formData.profileInfo || formData.profileInfo || {};
  const fullName =
    profileInfo.fullName || formData.profileInfo?.fullName || 'Your Name';
  const designation =
    profileInfo.designation ||
    formData.profileInfo?.designation ||
    'Professional Title';
  const summary = profileInfo.summary || formData.profileInfo?.summary || '';

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-[#161B22]">
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ backgroundColor: primaryColor }}
        >
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <FiFileText className="w-5 h-5" />
            <span>Live Preview (A4 Size)</span>
          </h3>
          <span className="text-xs font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full">
            {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}{' '}
            Theme
          </span>
        </div>

        <div
          className="p-8 bg-gray-100 dark:bg-[#0D1117] overflow-y-auto custom-scrollbar"
          style={{ height: 'calc(100vh - 200px)' }}
        >
          <div
            className="mx-auto bg-white shadow-2xl animate-fade-in"
            style={{
              width: '794px',
              minHeight: '1123px',
              padding: '60px 70px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <div
              className="text-center mb-8 pb-6 border-b-2"
              style={{ borderColor: primaryColor }}
            >
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {fullName}
              </h1>
              <p className="text-xl text-gray-600 mb-4 font-medium">
                {designation}
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                {formData.contactInfo?.email && (
                  <span className="flex items-center space-x-1">
                    <FiMail className="w-4 h-4" />
                    <span>{formData.contactInfo.email}</span>
                  </span>
                )}
                {formData.contactInfo?.phone && (
                  <span className="flex items-center space-x-1">
                    <FiPhone className="w-4 h-4" />
                    <span>{formData.contactInfo.phone}</span>
                  </span>
                )}
                {formData.contactInfo?.location && (
                  <span className="flex items-center space-x-1">
                    <FiMapPin className="w-4 h-4" />
                    <span>{formData.contactInfo.location}</span>
                  </span>
                )}
              </div>

              {(formData.contactInfo?.linkedIn ||
                formData.contactInfo?.github ||
                formData.contactInfo?.website) && (
                <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-gray-500">
                  {formData.contactInfo.linkedIn && (
                    <span className="flex items-center space-x-1">
                      <FiLinkedin className="w-3 h-3" />
                      <span>{formData.contactInfo.linkedIn}</span>
                    </span>
                  )}
                  {formData.contactInfo.github && (
                    <span className="flex items-center space-x-1">
                      <FiGithub className="w-3 h-3" />
                      <span>{formData.contactInfo.github}</span>
                    </span>
                  )}
                  {formData.contactInfo.website && (
                    <span className="flex items-center space-x-1">
                      <FiLink className="w-3 h-3" />
                      <span>{formData.contactInfo.website}</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {summary && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-3 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                  {summary}
                </p>
              </div>
            )}

            {formData.workExperiences &&
              formData.workExperiences.length > 0 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4 pb-2 border-b-2"
                    style={{
                      color: primaryColor,
                      borderColor: secondaryColor
                    }}
                  >
                    Work Experience
                  </h2>
                  <div className="space-y-5">
                    {formData.workExperiences.map((exp: any, index: number) => (
                      <div
                        key={index}
                        className="relative pl-4 border-l-2"
                        style={{ borderColor: secondaryColor }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {exp.role || 'Position Title'}
                            </h3>
                            <p className="text-gray-700 font-semibold text-sm">
                              {exp.company || 'Company Name'}
                            </p>
                          </div>
                          <span className="text-sm text-gray-600 whitespace-nowrap ml-4 font-medium">
                            {exp.startDate || 'Start'} -{' '}
                            {exp.endDate || 'Present'}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {formData.education && formData.education.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Education
                </h2>
                <div className="space-y-4">
                  {formData.education.map((edu: any, index: number) => (
                    <div
                      key={index}
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: secondaryColor }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {edu.degree || 'Degree'}
                          </h3>
                          <p className="text-gray-700 font-semibold text-sm">
                            {edu.institution || 'Institution'}
                          </p>
                        </div>
                        <span className="text-sm text-gray-600 whitespace-nowrap ml-4 font-medium">
                          {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.skills && formData.skills.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Skills & Expertise
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {formData.skills.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {skill.name || 'Skill'}
                        </span>
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: secondaryColor,
                            color: primaryColor
                          }}
                        >
                          {skill.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all rounded-full"
                          style={{
                            width: `${skill.progress}%`,
                            backgroundColor: primaryColor
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.projects && formData.projects.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Projects
                </h2>
                <div className="space-y-4">
                  {formData.projects.map((project: any, index: number) => (
                    <div
                      key={index}
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: secondaryColor }}
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        {project.github && (
                          <span className="flex items-center space-x-1">
                            <FiGithub className="w-3 h-3" />
                            <span>{project.github}</span>
                          </span>
                        )}
                        {project.liveDemo && (
                          <span className="flex items-center space-x-1">
                            <FiLink className="w-3 h-3" />
                            <span>{project.liveDemo}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.certifications && formData.certifications.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Certifications
                </h2>
                <div className="space-y-3">
                  {formData.certifications.map((cert: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                      </div>
                      <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.languages && formData.languages.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Languages
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {formData.languages.map((lang: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-semibold text-gray-900">
                        {lang.name}
                      </span>
                      <span className="text-xs text-gray-600">
                        {lang.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.interests && formData.interests.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: primaryColor,
                    borderColor: secondaryColor
                  }}
                >
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{
                        backgroundColor: secondaryColor,
                        color: primaryColor
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!fullName &&
              (!formData.workExperiences ||
                formData.workExperiences.length === 0) &&
              (!formData.education || formData.education.length === 0) &&
              (!formData.skills || formData.skills.length === 0) && (
                <div className="text-center py-20 text-gray-400">
                  <FiFileText className="w-20 h-20 mx-auto mb-6 opacity-30" />
                  <p className="text-xl font-semibold text-gray-500 mb-2">
                    Start Building Your Resume
                  </p>
                  <p className="text-sm text-gray-400">
                    Fill in your information on the left and watch your resume
                    come to life
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
