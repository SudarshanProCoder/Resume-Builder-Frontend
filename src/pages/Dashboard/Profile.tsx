import { useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiEdit,
  FiCamera,
  FiCalendar,
  FiAward,
} from "react-icons/fi";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string | null;
    plan: string;
    joinedDate: string;
  };
  onAvatarChange?: (file: File) => void;
  onEditProfile?: () => void;
}

const Profile = ({
  isOpen,
  onClose,
  user,
  onAvatarChange,
  onEditProfile,
}: ProfileProps) => {
  const [localAvatar, setLocalAvatar] = useState(user.avatar);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAvatarChange?.(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            {localAvatar || user.avatar ? (
              <img
                src={localAvatar || user.avatar || ""}
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
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
            <FiCalendar className="w-3 h-3" />
            <span>Member since {user.joinedDate}</span>
          </div>
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
                <FiAward className="w-5 h-5 text-white" />
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
          <button
            onClick={onEditProfile}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <FiEdit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 glass text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
