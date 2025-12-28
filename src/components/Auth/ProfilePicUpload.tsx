import React, { useRef } from 'react';
import { User, Camera } from 'lucide-react';

interface ProfilePicUploadProps {
  previewUrl: string | null;
  onChange: (file: File | null) => void;
}

export const ProfilePicUpload: React.FC<ProfilePicUploadProps> = ({
  previewUrl,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      onChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative group">
        <div
          onClick={handleClick}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:border-blue-600/50 dark:group-hover:border-indigo-500/50"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg cursor-pointer group-hover:scale-110 transition-transform">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">
        Click to upload photo
      </p>
    </div>
  );
};
