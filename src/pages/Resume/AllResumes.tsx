import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSun,
  FiMoon,
  FiFileText,
  FiArrowLeft,
  FiGrid,
  FiList,
  FiSearch,
  FiFilter,
  FiUser,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { resumeService, Resume } from '@/services/resumeService';
import ResumeCard from '../../components/Resume/ResumeCard';
import ResumeListItem from '../../components/Resume/ResumeListItem';
import EmptyState from '../../components/Resume/EmptyState';
import LoadingState from '../../components/Resume/LoadingState';

const AllResumes = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'modified'>(
    'recent'
  );

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await resumeService.getAllResumes();
      setResumes(data);
    } catch (err: any) {
      console.error('Error fetching resumes:', err);
      setError(err.message || 'Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      await resumeService.deleteResume(id);
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume. Please try again.');
    }
  };

  const handleDuplicateResume = async (id: string) => {
    try {
      const duplicated = await resumeService.duplicateResume(id);
      setResumes([duplicated, ...resumes]);
      alert('Resume duplicated successfully!');
    } catch (err) {
      console.error('Error duplicating resume:', err);
      alert('Failed to duplicate resume. Please try again.');
    }
  };

  const filteredResumes = resumes
    .filter((resume) => {
      const query = searchQuery.toLowerCase();
      const profileInfo = resume.profileInfo || (resume as any).profileInfo;
      const fullName = profileInfo?.fullName || '';

      return (
        resume.title.toLowerCase().includes(query) ||
        fullName.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'modified':
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case 'recent':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#0D1117]' : 'bg-[#F5F7FA]'}`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#161B22]/70 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FiFileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    All Resumes
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {filteredResumes.length} resume
                    {filteredResumes.length !== 1 ? 's' : ''}{' '}
                    {searchQuery && 'found'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? (
                  <FiSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl py-2 bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 rounded-2xl p-6 bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
              <div className="flex-1 max-w-md relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="modified">Last Modified</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                  <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                    title="Grid View"
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                    title="List View"
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <div className="text-center py-12 rounded-2xl bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="text-red-600 dark:text-red-400 mb-4 font-semibold">
                {error}
              </p>
              <button
                onClick={fetchAllResumes}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : filteredResumes.length === 0 ? (
            searchQuery ? (
              <div className="text-center py-12 rounded-2xl p-12 bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-700 shadow-lg">
                <FiSearch className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No results found for "{searchQuery}"
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <EmptyState onCreateResume={() => navigate('/dashboard')} />
            )
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResumes.map((resume) => (
                    <ResumeCard
                      key={resume._id}
                      resume={resume}
                      onEdit={() => navigate(`/create-resume/${resume._id}`)}
                      onDelete={() => handleDeleteResume(resume._id)}
                      onDuplicate={() => handleDuplicateResume(resume._id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredResumes.map((resume) => (
                    <ResumeListItem
                      key={resume._id}
                      resume={resume}
                      onEdit={() => navigate(`/create-resume/${resume._id}`)}
                      onDelete={() => handleDeleteResume(resume._id)}
                      onDuplicate={() => handleDuplicateResume(resume._id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllResumes;
