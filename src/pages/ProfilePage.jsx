import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser, updateAvatar } from "../features/auth/authSlice";
import { FiUser, FiMail, FiCalendar, FiCamera, FiSave, FiEdit2, FiArrowLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const fileInputRef = useRef(null);

  const handleSave = () => {
    if (!name || !email) {
      toast.error("Please fill all fields", {
        icon: <FiAlertCircle className="w-4 h-4" />,
      });
      return;
    }
    
    dispatch(updateUser({ name, email }));
    setIsEditing(false);
    toast.success("Profile updated successfully!", {
      icon: <FiCheckCircle className="w-4 h-4 text-green-500" />,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB", {
          icon: <FiAlertCircle className="w-4 h-4" />,
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateAvatar(reader.result));
        toast.success("Avatar updated!", {
          icon: <FiCamera className="w-4 h-4" />,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // اگر کاربر لاگین نکرده باشه
  if (!user) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#2D3A2B] dark:text-white mb-4 text-sm sm:text-base">Please login to view profile</p>
          <Link to="/login" className="bg-[#AE2448] text-white px-5 sm:px-6 py-2 rounded-lg text-sm sm:text-base">Login</Link>
        </div>
      </div>
    );
  }

  const memberSince = new Date(user.memberSince).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8 sm:py-12">
      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* دکمه بازگشت - ریسپانسیو */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#2D3A2B] dark:text-gray-400 hover:text-[#AE2448] mb-4 sm:mb-6 transition-colors text-sm sm:text-base">
          <FiArrowLeft className="text-sm sm:text-base" /> Back to Home
        </Link>

        {/* Header - ریسپانسیو */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3A2B] dark:text-white">My Profile</h1>
          <p className="text-xs sm:text-sm text-[#2D3A2B]/60 dark:text-gray-400 mt-1 sm:mt-2">Manage your account information</p>
        </div>

        <div className="bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          
          {/* Avatar Section - ریسپانسیو */}
          <div className="relative bg-gradient-to-r from-[#AE2448] to-[#6E1A37] p-6 sm:p-8 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="text-4xl sm:text-5xl text-white" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <FiCamera className="text-[#AE2448] text-xs sm:text-sm" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-3 sm:mt-4">{user?.name}</h2>
            <p className="text-white/80 text-xs sm:text-sm">{user?.email}</p>
          </div>

          {/* Info Section - ریسپانسیو */}
          <div className="p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-5 sm:mb-6 flex-wrap gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#2D3A2B] dark:text-white">Account Information</h3>
              {!isEditing && (
                <button
                  onClick={() => {
                    setName(user.name);
                    setEmail(user.email);
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-1 sm:gap-2 text-[#AE2448] hover:underline transition-colors text-xs sm:text-sm"
                >
                  <FiEdit2 className="text-sm sm:text-base" /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[#2D3A2B] dark:text-gray-300 mb-1 text-xs sm:text-sm">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-[#2D3A2B] dark:text-gray-300 mb-1 text-xs sm:text-sm">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition text-sm sm:text-base"
                  />
                </div>
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 sm:gap-2 bg-[#AE2448] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#6E1A37] transition-all hover:scale-105 text-sm sm:text-base"
                  >
                    <FiSave className="text-sm sm:text-base" /> Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                    }}
                    className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-[#D5E7B5]/30 dark:bg-gray-800/50 rounded-xl">
                  <FiUser className="text-[#AE2448] text-base sm:text-xl" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-[#2D3A2B]/60 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-[#2D3A2B] dark:text-white text-sm sm:text-base">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-[#D5E7B5]/30 dark:bg-gray-800/50 rounded-xl">
                  <FiMail className="text-[#AE2448] text-base sm:text-xl" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-[#2D3A2B]/60 dark:text-gray-400">Email Address</p>
                    <p className="font-medium text-[#2D3A2B] dark:text-white text-sm sm:text-base">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-[#D5E7B5]/30 dark:bg-gray-800/50 rounded-xl">
                  <FiCalendar className="text-[#AE2448] text-base sm:text-xl" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-[#2D3A2B]/60 dark:text-gray-400">Member Since</p>
                    <p className="font-medium text-[#2D3A2B] dark:text-white text-sm sm:text-base">{memberSince}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;