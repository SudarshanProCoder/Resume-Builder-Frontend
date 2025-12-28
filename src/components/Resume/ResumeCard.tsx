import {
  FiEdit,
  FiTrash2,
  FiCopy,
  FiDownload,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin
} from 'react-icons/fi';
import { Resume } from '@/services/resumeService';

interface ResumeCardProps {
  resume: Resume;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const ResumeCard = ({
  resume,
  onEdit,
  onDelete,
  onDuplicate
}: ResumeCardProps) => {
  const formatDate = (date: string) => {
    const now = new Date();
    const resumeDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - resumeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return resumeDate.toLocaleDateString();
  };

  const profileInfo = resume.profileInfo;
  const fullName = profileInfo?.fullName || 'Untitled Resume';
  const designation = profileInfo?.designation || 'No Title';
  const summary = profileInfo?.summary || '';

  const primaryColor = resume.template?.colorPalette?.[0] || '#2563EB';
  const secondaryColor = resume.template?.colorPalette?.[1] || '#DBEAFE';

  const calculateCompletion = () => {
    let completed = 0;
    const total = 9;

    if (profileInfo?.fullName && profileInfo?.designation) completed++;
    if (resume.contactInfo?.email || resume.contactInfo?.phone) completed++;
    if (resume.workExperiences?.length > 0) completed++;
    if (resume.education?.length > 0) completed++;
    if (resume.skills?.length > 0) completed++;
    if (resume.projects?.length > 0) completed++;
    if (resume.certifications?.length > 0) completed++;
    if (resume.languages?.length > 0) completed++;
    if (resume.interests?.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="group rounded-2xl p-6 hover:shadow-2xl transition-all bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            {completionPercentage}%
          </span>
        </div>
        {resume.template && (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium capitalize text-xs">
            {resume.template.theme}
          </span>
        )}
      </div>

      <div
        className="h-[380px] bg-white rounded-lg mb-4 overflow-hidden relative shadow-lg cursor-pointer"
        onClick={onEdit}
      >
        <div className="w-full h-full p-3 text-[5px] overflow-y-auto custom-mini-scroll">
          <div
            className="text-center pb-1.5 mb-1.5 border-b"
            style={{ borderColor: primaryColor }}
          >
            <h1
              className="font-bold mb-0.5 truncate"
              style={{
                color: primaryColor,
                fontSize: '9px'
              }}
            >
              {fullName}
            </h1>
            <p className="text-gray-600 text-[6px] mb-0.5 truncate">
              {designation}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-gray-500 text-[5px] flex-wrap">
              {resume.contactInfo?.email && (
                <span className="flex items-center gap-0.5">
                  <FiMail className="w-1.5 h-1.5" />
                  <span className="truncate max-w-[50px]">
                    {resume.contactInfo.email}
                  </span>
                </span>
              )}
              {resume.contactInfo?.phone && (
                <span className="flex items-center gap-0.5">
                  <FiPhone className="w-1.5 h-1.5" />
                  <span>{resume.contactInfo.phone}</span>
                </span>
              )}
              {resume.contactInfo?.location && (
                <span className="flex items-center gap-0.5">
                  <FiMapPin className="w-1.5 h-1.5" />
                  <span className="truncate max-w-[35px]">
                    {resume.contactInfo.location}
                  </span>
                </span>
              )}
            </div>
            {(resume.contactInfo?.linkedIn ||
              resume.contactInfo?.github ||
              resume.contactInfo?.website) && (
              <div className="flex items-center justify-center gap-1 mt-0.5 text-[4px] text-gray-400">
                {resume.contactInfo.linkedIn && (
                  <span className="flex items-center gap-0.5">
                    <FiLinkedin className="w-1.5 h-1.5" />
                  </span>
                )}
                {resume.contactInfo.github && (
                  <span className="flex items-center gap-0.5">
                    <FiGithub className="w-1.5 h-1.5" />
                  </span>
                )}
              </div>
            )}
          </div>

          {summary && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Summary
              </h2>
              <p className="text-gray-700 text-[5px] line-clamp-2">{summary}</p>
            </div>
          )}

          {resume.workExperiences && resume.workExperiences.length > 0 && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Work Experience
              </h2>
              {resume.workExperiences.slice(0, 2).map((exp, idx) => (
                <div
                  key={idx}
                  className="mb-1 pl-1 border-l"
                  style={{ borderColor: secondaryColor }}
                >
                  <p className="font-semibold text-[5.5px] text-gray-900 truncate">
                    {exp.role}
                  </p>
                  <p className="text-gray-600 text-[5px] truncate">
                    {exp.company}
                  </p>
                  <p className="text-gray-500 text-[4.5px]">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 text-[5px] line-clamp-1 mt-0.5">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
              {resume.workExperiences.length > 2 && (
                <p className="text-gray-500 text-[5px] italic">
                  +{resume.workExperiences.length - 2} more...
                </p>
              )}
            </div>
          )}

          {resume.education && resume.education.length > 0 && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Education
              </h2>
              {resume.education.slice(0, 2).map((edu, idx) => (
                <div
                  key={idx}
                  className="mb-1 pl-1 border-l"
                  style={{ borderColor: secondaryColor }}
                >
                  <p className="font-semibold text-[5.5px] text-gray-900 truncate">
                    {edu.degree}
                  </p>
                  <p className="text-gray-600 text-[5px] truncate">
                    {edu.institution}
                  </p>
                  <p className="text-gray-500 text-[4.5px]">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}

          {resume.skills && resume.skills.length > 0 && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-0.5">
                {resume.skills.slice(0, 8).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-1 py-0.5 text-[4.5px] rounded font-medium"
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
                {resume.skills.length > 8 && (
                  <span
                    className="px-1 py-0.5 text-[4.5px] rounded font-medium"
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor
                    }}
                  >
                    +{resume.skills.length - 8}
                  </span>
                )}
              </div>
            </div>
          )}

          {resume.projects && resume.projects.length > 0 && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Projects
              </h2>
              {resume.projects.slice(0, 2).map((project, idx) => (
                <div
                  key={idx}
                  className="mb-1 pl-1 border-l"
                  style={{ borderColor: secondaryColor }}
                >
                  <p className="font-semibold text-[5.5px] text-gray-900 truncate">
                    {project.title}
                  </p>
                  <p className="text-gray-600 text-[5px] line-clamp-1">
                    {project.description}
                  </p>
                </div>
              ))}
              {resume.projects.length > 2 && (
                <p className="text-gray-500 text-[5px] italic">
                  +{resume.projects.length - 2} more...
                </p>
              )}
            </div>
          )}

          {resume.certifications && resume.certifications.length > 0 && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Certifications
              </h2>
              {resume.certifications.slice(0, 2).map((cert, idx) => (
                <div key={idx} className="mb-0.5">
                  <p className="font-semibold text-[5.5px] text-gray-900 truncate">
                    {cert.title}
                  </p>
                  <p className="text-gray-600 text-[5px] truncate">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              ))}
              {resume.certifications.length > 2 && (
                <p className="text-gray-500 text-[5px] italic">
                  +{resume.certifications.length - 2} more...
                </p>
              )}
            </div>
          )}

          {resume.languages && resume.languages.length > 0 && (
            <div className="mb-1.5">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <div className="grid grid-cols-2 gap-0.5">
                {resume.languages.slice(0, 4).map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-[5px] font-medium text-gray-900 truncate">
                      {lang.name}
                    </span>
                    <span className="text-[4.5px] text-gray-600">
                      {lang.progress}%
                    </span>
                  </div>
                ))}
              </div>
              {resume.languages.length > 4 && (
                <p className="text-gray-500 text-[5px] italic mt-0.5">
                  +{resume.languages.length - 4} more...
                </p>
              )}
            </div>
          )}

          {resume.interests && resume.interests.length > 0 && (
            <div className="mb-1">
              <h2
                className="font-bold mb-0.5 text-[6px]"
                style={{ color: primaryColor }}
              >
                Interests
              </h2>
              <div className="flex flex-wrap gap-0.5">
                {resume.interests.slice(0, 6).map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-1 py-0.5 text-[4.5px] rounded font-medium"
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor
                    }}
                  >
                    {interest}
                  </span>
                ))}
                {resume.interests.length > 6 && (
                  <span
                    className="px-1 py-0.5 text-[4.5px] rounded font-medium"
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor
                    }}
                  >
                    +{resume.interests.length - 6}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:scale-105 transition-all text-sm shadow-lg"
          >
            ✏️ Quick Edit
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
          {resume.title || 'Untitled Resume'}
        </h3>
        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <FiClock className="w-3 h-3" />
            <span>{formatDate(resume.updatedAt)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>
              {
                [
                  resume.workExperiences?.length,
                  resume.education?.length,
                  resume.skills?.length,
                  resume.projects?.length
                ].filter((n) => n && n > 0).length
              }{' '}
              sections
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 font-medium"
        >
          <FiEdit className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={onDuplicate}
          className="p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          title="Duplicate Resume"
        >
          <FiCopy className="w-5 h-5" />
        </button>
        <button
          className="p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          title="Download PDF"
        >
          <FiDownload className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
          title="Delete Resume"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .custom-mini-scroll::-webkit-scrollbar {
          width: 2px;
        }

        .custom-mini-scroll::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        .custom-mini-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .custom-mini-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default ResumeCard;
