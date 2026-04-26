import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiMoon, FiSave, FiSun, FiSettings, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'sonner';
import { useSettings } from '../hooks/useSettings';

const SettingsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useSettings();
  
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleSavePreferences = () => {
    localStorage.setItem('nexcart_notifications', JSON.stringify(notifications));
    localStorage.setItem('nexcart_email_updates', JSON.stringify(emailUpdates));
    
    toast.success('Preferences saved!', {
      icon: <FiCheckCircle className="w-5 h-5 text-green-500" />,
      duration: 2000,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center px-4">
        <div className="text-center">
          <FiSettings className="text-5xl sm:text-6xl text-[#AE2448] mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#2D3A2B] dark:text-white mb-2">Please Login</h2>
          <p className="text-sm sm:text-base text-[#2D3A2B]/60 dark:text-gray-400 mb-5 sm:mb-6">You need to login to access settings</p>
          <Link to="/login" className="bg-[#AE2448] text-white px-5 sm:px-6 py-2 rounded-lg text-sm sm:text-base">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-6 sm:py-8">
      <div className="container-custom max-w-2xl mx-auto px-4 sm:px-6">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#2D3A2B] dark:text-gray-400 hover:text-[#AE2448] mb-4 sm:mb-6 transition-colors text-sm sm:text-base">
          <FiArrowLeft className="text-sm sm:text-base" /> Back to Home
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <FiSettings className="text-2xl sm:text-3xl text-[#AE2448]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white">Settings</h1>
        </div>

        <div className="space-y-5 sm:space-y-6">
          
          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-[#2D3A2B] dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <FiMoon className="text-[#AE2448] text-sm sm:text-base" /> Appearance
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#72BAA9]/20 gap-3 sm:gap-0">
              <div>
                <p className="font-medium text-[#2D3A2B] dark:text-white text-sm sm:text-base">Dark Mode</p>
                <p className="text-xs sm:text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 rounded-full bg-[#72BAA9]/30 transition-all duration-300 shrink-0"
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-[#AE2448] transition-all duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`}>
                  {theme === 'dark' ? <FiSun className="text-white text-[10px] sm:text-xs" /> : <FiMoon className="text-white text-[10px] sm:text-xs" />}
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-[#2D3A2B] dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <FiBell className="text-[#AE2448] text-sm sm:text-base" /> Notifications
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-3 sm:gap-0">
                <div>
                  <p className="font-medium text-[#2D3A2B] dark:text-white text-sm sm:text-base">Push Notifications</p>
                  <p className="text-xs sm:text-sm text-gray-500">Receive updates about your orders</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 shrink-0 ${notifications ? 'bg-[#AE2448]' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-3 sm:gap-0">
                <div>
                  <p className="font-medium text-[#2D3A2B] dark:text-white text-sm sm:text-base">Email Updates</p>
                  <p className="text-xs sm:text-sm text-gray-500">Get weekly deals and offers</p>
                </div>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 shrink-0 ${emailUpdates ? 'bg-[#AE2448]' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${emailUpdates ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSavePreferences}
            className="w-full bg-gradient-to-r from-[#AE2448] to-[#6E1A37] text-white py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            <FiSave className="text-sm sm:text-base" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;