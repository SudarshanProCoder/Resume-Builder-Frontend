import {
  FiEdit,
  FiTrash2,
  FiCopy,
  FiDownload,
  FiClock,
  FiUser,
  FiFileText
} from 'react-icons/fi';
import { Resume } from '@/services/resumeService';

interface ResumeListItemProps {
  resume: Resume;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const ResumeListItem = ({
  resume,
  onEdit,
  onDelete,
  onDuplicate
}: ResumeListItemProps) => {
  const formatDate = (date: string) => {
    const now = new Date();
    const resumeDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - resumeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return resumeDate.toLocaleDateString();
  };

  const profileInfo = resume.profileInfo || (resume as any).profileInfo;
  const fullName = profileInfo?.fullName || 'No name';

  return (
    <div className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiFileText className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
              {resume.title || 'Untitled Resume'}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap gap-2">
              <span className="flex items-center space-x-1">
                <FiUser className="w-4 h-4" />
                <span className="truncate">{fullName}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiClock className="w-4 h-4" />
                <span>Updated {formatDate(resume.updatedAt)}</span>
              </span>
              {resume.template && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium capitalize">
                  {resume.template.theme}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={onEdit}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <FiEdit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={onEdit}
            className="sm:hidden p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={onDuplicate}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            title="Duplicate"
          >
            <FiCopy className="w-5 h-5" />
          </button>
          <button
            className="hidden sm:block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            title="Download"
          >
            <FiDownload className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            title="Delete"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeListItem;
