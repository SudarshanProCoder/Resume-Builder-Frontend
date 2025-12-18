import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSun,
  FiMoon,
  FiFileText,
  FiDownload,
  FiEdit,
  FiPlus,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiCalendar,
  FiMoreVertical,
  FiTrash2,
  FiCopy,
  FiEye,
  FiStar,
  FiZap,
  FiUser,
  FiLogOut,
  FiCamera,
  FiMail,
  FiCreditCard,
  FiX,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { logout } = useAuth();

  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: null as string | null,
    plan: "Pro",
    joinedDate: "Jan 2024",
  });

  useEffect(() => {
    const savedTheme = window.localStorage?.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      window.localStorage?.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage?.setItem("theme", "light");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = {
    totalResumes: 12,
    templatesOwned: 8,
    subscriptionDaysLeft: 23,
    viewsThisMonth: 147,
  };

  const recentResumes = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      lastModified: "2 hours ago",
      template: "Modern Pro",
      views: 45,
      favorite: true,
    },
    {
      id: 2,
      title: "Product Designer Resume",
      lastModified: "1 day ago",
      template: "Creative Edge",
      views: 32,
      favorite: false,
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      lastModified: "3 days ago",
      template: "Classic Elite",
      views: 28,
      favorite: true,
    },
    {
      id: 4,
      title: "UX Researcher Position",
      lastModified: "5 days ago",
      template: "Minimal Clean",
      views: 19,
      favorite: false,
    },
  ];

  const quickActions = [
    {
      icon: <FiPlus className="w-6 h-6" />,
      title: "Create New Resume",
      description: "Start from scratch or use a template",
      color: "from-blue-600 to-indigo-600",
      action: () => navigate("/create"),
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "Browse Templates",
      description: "Explore our premium templates",
      color: "from-purple-600 to-pink-600",
      action: () => navigate("/templates"),
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "AI Resume Writer",
      description: "Let AI optimize your content",
      color: "from-amber-500 to-orange-600",
      action: () => navigate("/ai-writer"),
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "dark bg-[#0D1117]" : "bg-[#F5F7FA]"
      }`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#161B22]/70 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
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
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-2xl py-2 animate-fade-in">
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center space-x-2"
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

      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="glass rounded-2xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile
              </h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-gray-200 dark:border-gray-700">
                    <FiUser className="w-12 h-12 text-white" />
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                >
                  <FiCamera className="w-4 h-4 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Member since {user.joinedDate}
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Email Address
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiCreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Current Plan
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.plan} Plan
                      </p>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2">
                <FiEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full px-4 py-3 glass text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your resumes today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up">
            <div className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <FiFileText className="w-6 h-6 text-white" />
                  </div>
                  <FiTrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.totalResumes}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Resumes
                </p>
              </div>
            </div>

            <div className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                  <FiStar className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.templatesOwned}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Templates Owned
                </p>
              </div>
            </div>

            <div className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <FiClock className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.subscriptionDaysLeft}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Days Left (Pro)
                </p>
              </div>
            </div>

            <div className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <FiEye className="w-6 h-6 text-white" />
                  </div>
                  <FiTrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.viewsThisMonth}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Views This Month
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 animate-slide-up animation-delay-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className="group glass rounded-2xl p-6 text-left hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-white">{action.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="animate-slide-up animation-delay-400">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Resume History
              </h2>
              <button className="text-blue-600 dark:text-indigo-400 hover:underline text-sm font-medium">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentResumes.map((resume, idx) => (
                <div
                  key={resume.id}
                  className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {resume.title}
                        </h3>
                        {resume.favorite && (
                          <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Template: {resume.template}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center space-x-1">
                          <FiClock className="w-3 h-3" />
                          <span>{resume.lastModified}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiEye className="w-3 h-3" />
                          <span>{resume.views} views</span>
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <FiMoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2">
                      <FiEdit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="p-2 glass rounded-lg hover:shadow-lg hover:scale-105 transition-all">
                      <FiDownload className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button className="p-2 glass rounded-lg hover:shadow-lg hover:scale-105 transition-all">
                      <FiCopy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button className="p-2 glass rounded-lg hover:shadow-lg hover:scale-105 transition-all text-red-600 dark:text-red-400">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {recentResumes.length === 0 && (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiFileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Resumes Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first professional resume in minutes
                </p>
                <button
                  onClick={() => navigate("/create")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Create Your First Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
