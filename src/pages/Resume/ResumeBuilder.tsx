import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiSave,
  FiDownload,
  FiEye,
  FiArrowLeft,
  FiDroplet,
  FiLayout,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiChevronRight,
  FiCheck,
  FiUser,
  FiMail,
  FiBriefcase,
  FiBook,
  FiTarget,
  FiFolder,
  FiAward,
  FiGlobe,
  FiHeart
} from 'react-icons/fi';
import { resumeService, Resume } from '@/services/resumeService';
import { ProfileSection } from '@/components/Resume/ProfileSection';
import { ContactSection } from '@/components/Resume/ContactSection';
import { WorkSection } from '@/components/Resume/WorkSection';
import { EducationSection } from '@/components/Resume/EducationSection';
import { SkillsSection } from '@/components/Resume/SkillsSection';
import { ProjectsSection } from '@/components/Resume/ProjectsSection';
import { CertificationsSection } from '@/components/Resume/CertificationsSection';
import { LanguagesSection } from '@/components/Resume/LanguageSection';
import { InterestsSection } from '@/components/Resume/InterestsSection';
import { A4Preview } from '@/components/Resume/A4Preview';
import { useSnackbar } from '@/components/Snackbar/SnackbarProvider';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', icon: '🎯' },
  { id: 'classic', name: 'Classic', icon: '📄' },
  { id: 'creative', name: 'Creative', icon: '🎨' },
  { id: 'minimal', name: 'Minimal', icon: '⚡' }
];

const COLOR_PALETTES = [
  { name: 'Ocean', colors: ['#2563EB', '#DBEAFE'] },
  { name: 'Forest', colors: ['#047857', '#D1FAE5'] },
  { name: 'Sunset', colors: ['#EA580C', '#FFEDD5'] },
  { name: 'Purple', colors: ['#7C3AED', '#EDE9FE'] },
  { name: 'Rose', colors: ['#DC2626', '#FEE2E2'] },
  { name: 'Slate', colors: ['#1F2937', '#F3F4F6'] }
];

interface FormData {
  title: string;
  profileInfo: {
    fullName: string;
    designation: string;
    summary: string;
    profilePreviewUrl: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    github: string;
    website: string;
  };
  workExperiences: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    name: string;
    progress: number;
  }>;
  projects: Array<{
    title: string;
    description: string;
    github: string;
    liveDemo: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    year: string;
  }>;
  languages: Array<{
    name: string;
    progress: number;
  }>;
  interests: string[];
}

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string>('profile');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  const [resume, setResume] = useState<Resume | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0]);
  const { showSuccess, showError } = useSnackbar();

  const [formData, setFormData] = useState<FormData>({
    title: 'Untitled Resume',
    profileInfo: {
      fullName: '',
      designation: '',
      summary: '',
      profilePreviewUrl: ''
    },
    contactInfo: {
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      website: ''
    },
    workExperiences: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: []
  });

  const sections = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: FiUser,
      component: ProfileSection,
      isCompleted: !!(
        formData.profileInfo.fullName && formData.profileInfo.designation
      )
    },
    {
      id: 'contact',
      title: 'Contact Details',
      icon: FiMail,
      component: ContactSection,
      isCompleted: !!(formData.contactInfo.email || formData.contactInfo.phone)
    },
    {
      id: 'work',
      title: 'Work Experience',
      icon: FiBriefcase,
      component: WorkSection,
      isCompleted: formData.workExperiences.length > 0
    },
    {
      id: 'education',
      title: 'Education',
      icon: FiBook,
      component: EducationSection,
      isCompleted: formData.education.length > 0
    },
    {
      id: 'skills',
      title: 'Skills & Expertise',
      icon: FiTarget,
      component: SkillsSection,
      isCompleted: formData.skills.length > 0
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: FiFolder,
      component: ProjectsSection,
      isCompleted: formData.projects.length > 0
    },
    {
      id: 'certifications',
      title: 'Certifications',
      icon: FiAward,
      component: CertificationsSection,
      isCompleted: formData.certifications.length > 0
    },
    {
      id: 'languages',
      title: 'Languages',
      icon: FiGlobe,
      component: LanguagesSection,
      isCompleted: formData.languages.length > 0
    },
    {
      id: 'interests',
      title: 'Interests & Hobbies',
      icon: FiHeart,
      component: InterestsSection,
      isCompleted: formData.interests.length > 0
    }
  ];

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
    if (id) {
      loadResume();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getResume(id!);
      setResume(data);

      setFormData({
        title: data.title || 'Untitled Resume',
        profileInfo: {
          fullName: data.profileInfo?.fullName || '',
          designation: data.profileInfo?.designation || '',
          summary: data.profileInfo?.summary || '',
          profilePreviewUrl: data.profileInfo?.profilePreviewUrl || ''
        },
        contactInfo: {
          email: data.contactInfo?.email || '',
          phone: data.contactInfo?.phone || '',
          location: data.contactInfo?.location || '',
          linkedIn: data.contactInfo?.linkedIn || '',
          github: data.contactInfo?.github || '',
          website: data.contactInfo?.website || ''
        },
        workExperiences: data.workExperiences || [],
        education: data.education || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        languages: data.languages || [],
        interests: data.interests || []
      });

      if (data.template) {
        setSelectedTheme(data.template.theme || 'modern');
        const foundPalette = COLOR_PALETTES.find(
          (p) => p.colors[0] === data.template?.colorPalette?.[0]
        );
        if (foundPalette) {
          setSelectedPalette(foundPalette);
        } else {
          setSelectedPalette({
            name: 'Custom',
            colors: data.template.colorPalette || COLOR_PALETTES[0].colors
          });
        }
      }
    } catch (error) {
      console.error('❌ Error loading resume:', error);
      alert('Failed to load resume. Please try again.');
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

  const handleSave = async () => {
    if (!resume) return;
    try {
      setSaving(true);
      await resumeService.updateResume(resume._id, {
        ...formData,
        template: {
          theme: selectedTheme,
          colorPalette: selectedPalette.colors
        }
      });
      showSuccess('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      showError('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading resume...
          </p>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0D1117] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Resume Selected
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please create a new resume from the dashboard
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#0D1117]' : 'bg-[#F5F7FA]'}`}
    >
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#161B22]/70 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/get-resumes')}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="text-xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 min-w-[200px]"
                placeholder="Resume Title"
              />
            </div>

            <div className="flex items-center space-x-2">
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

              <button
                onClick={() => setShowTemplateModal(true)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300"
              >
                <FiLayout className="w-4 h-4" />
                <span>Template</span>
              </button>

              <button
                onClick={() => setShowColorModal(true)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300"
              >
                <FiDroplet className="w-4 h-4" />
                <span>Colors</span>
              </button>

              <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300">
                <FiEye className="w-4 h-4" />
                <span>Preview</span>
              </button>

              <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300">
                <FiDownload className="w-4 h-4" />
                <span>Download</span>
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <FiSave className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-5 space-y-4">
              {sections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSection === section.id;
                const SectionComponent = section.component;

                return (
                  <div
                    key={section.id}
                    className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-[#161B22] transition-all"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#0D1117] transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isExpanded
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          } transition-colors`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {section.title}
                          </h3>
                          {section.isCompleted && !isExpanded && (
                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
                              <FiCheck className="w-3 h-3" />
                              <span>Completed</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {section.isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <FiCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                        {isExpanded ? (
                          <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-6 animate-slide-down bg-gray-50 dark:bg-[#0D1117]">
                        <div className="max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-2">
                          <SectionComponent
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="xl:col-span-7">
              <A4Preview
                formData={formData}
                selectedTheme={selectedTheme}
                selectedPalette={selectedPalette}
              />
            </div>
          </div>
        </div>
      </div>

      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full p-6 bg-white dark:bg-[#161B22]">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Template
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTheme(template.id);
                    setShowTemplateModal(false);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedTheme === template.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTemplateModal(false)}
              className="w-full px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showColorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full p-6 bg-white dark:bg-[#161B22]">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Color Palette
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {COLOR_PALETTES.map((palette) => (
                <button
                  key={palette.name}
                  onClick={() => {
                    setSelectedPalette(palette);
                    setShowColorModal(false);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPalette.name === palette.name
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {palette.name}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowColorModal(false)}
              className="w-full px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 2000px;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDark ? '#1f2937' : '#f3f4f6'};
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? '#4b5563' : '#d1d5db'};
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#6b7280' : '#9ca3af'};
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
