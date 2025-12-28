import { useState, useEffect } from 'react';
import {
  FiX,
  FiUser,
  FiMail,
  FiEdit,
  FiCamera,
  FiCalendar,
  FiAward,
  FiLoader
} from 'react-icons/fi';
import { authService } from '../../services/authService';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  profileImageUrl: string;
  subscriptionPlan: string;
  createdAt: string;
}

const Profile = ({ isOpen, onClose, onEditProfile }: ProfileProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [localAvatar, setLocalAvatar] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await authService.getProfile();
      setUser({
        name: data.name,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        subscriptionPlan: data.subscriptionPlan,
        createdAt: data.createdAt
      });
      setLocalAvatar(data.profileImageUrl);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          setLocalAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
        const response = await authService.uploadProfileImage(file);
        setLocalAvatar(response.imageUrl);

        await fetchProfile();
      } catch (err: any) {
        console.error('Error uploading avatar:', err);
        setError('Failed to upload image');
        if (user) {
          setLocalAvatar(user.profileImageUrl);
        }
      } finally {
        setUploading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (!isOpen) return null;

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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Loading profile...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-600 dark:text-red-400 text-center mb-4">
              {error}
            </p>
            <button
              onClick={fetchProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : user ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                {localAvatar ? (
                  <img
                    src={localAvatar}
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
                  className={`absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    <FiLoader className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <FiCamera className="w-4 h-4 text-white" />
                  )}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                {user.name}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <FiCalendar className="w-3 h-3" />
                <span>Member since {formatDate(user.createdAt)}</span>
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
                        {user.subscriptionPlan} Plan
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
