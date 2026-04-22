import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiMoon, FiSave, FiGlobe, FiSun, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useSettings } from '../hooks/useSettings';

const SettingsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useSettings();
  
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSavePreferences = () => {
    localStorage.setItem('nexcart_notifications', JSON.stringify(notifications));
    localStorage.setItem('nexcart_email_updates', JSON.stringify(emailUpdates));
    localStorage.setItem('nexcart_language', language);
    
    toast.success('Preferences saved!', { icon: '✅' });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <FiSettings className="text-6xl text-[#AE2448] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2D3A2B] dark:text-white mb-2">Please Login</h2>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 mb-6">You need to login to access settings</p>
          <Link to="/login" className="bg-[#AE2448] text-white px-6 py-2 rounded-lg">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8">
      <div className="container-custom max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#2D3A2B] dark:text-gray-400 hover:text-[#AE2448] mb-6 transition-colors">
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <FiSettings className="text-3xl text-[#AE2448]" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white">Settings</h1>
        </div>

        <div className="space-y-6">
          
          {/* Appearance */}
          <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-[#2D3A2B] dark:text-white mb-4 flex items-center gap-2">
              <FiMoon className="text-[#AE2448]" /> Appearance
            </h2>
            <div className="flex items-center justify-between py-3 border-b border-[#72BAA9]/20">
              <div>
                <p className="font-medium text-[#2D3A2B] dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 rounded-full bg-[#72BAA9]/30 transition-all duration-300"
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-[#AE2448] transition-all duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`}>
                  {theme === 'dark' ? <FiSun className="text-white text-xs" /> : <FiMoon className="text-white text-xs" />}
                </div>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-[#2D3A2B] dark:text-white mb-4 flex items-center gap-2">
              <FiBell className="text-[#AE2448]" /> Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#2D3A2B] dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your orders</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${notifications ? 'bg-[#AE2448]' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#2D3A2B] dark:text-white">Email Updates</p>
                  <p className="text-sm text-gray-500">Get weekly deals and offers</p>
                </div>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${emailUpdates ? 'bg-[#AE2448]' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${emailUpdates ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-[#2D3A2B] dark:text-white mb-4 flex items-center gap-2">
              <FiGlobe className="text-[#AE2448]" /> Language
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#72BAA9] bg-white dark:bg-gray-800 text-[#2D3A2B] dark:text-white focus:border-[#AE2448] outline-none transition-all"
            >
              <option value="en">English (US)</option>
              <option value="fa">فارسی</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSavePreferences}
            className="w-full bg-gradient-to-r from-[#AE2448] to-[#6E1A37] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <FiSave /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;