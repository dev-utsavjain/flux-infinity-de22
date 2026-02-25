import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050506]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">Task Manager</Link>
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 text-white hover:text-[#5E6AD2] transition-colors duration-300"
            >
              <Icon name="User" className="w-5 h-5" />
              <span className="hidden md:inline">Profile</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0B] border border-white/10 rounded-lg shadow-xl">
                <Link to="/profile" className="block px-4 py-2 text-white hover:bg-white/5 rounded-t-lg">Profile</Link>
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/5 rounded-b-lg">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#050506] border-t border-white/10 py-8 mt-12">
    <div className="container mx-auto px-4 md:px-6 text-center text-white/60">
      <p>&copy; 2024 Task Manager. All rights reserved.</p>
    </div>
  </footer>
);

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&auto=format'
  });
  const [settings, setSettings] = useState({
    theme: 'dark',
    defaultView: 'dashboard',
    taskDefaults: { priority: 'medium', autoAssign: false }
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    dueDateReminders: true,
    completionNotifications: false,
    weeklyReports: true
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setEditingProfile(false);
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_PROFILE}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(profile)
    // });
  };

  const handleSettingsUpdate = (key, value) => {
    setSettings({ ...settings, [key]: value });
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_SETTINGS}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ [key]: value })
    // });
  };

  const exportData = (format) => {
    const data = { profile, settings, notifications, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-manager-data.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              {editingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center gap-6 mb-6">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/128x128/1a1a2e/eaeaea?text=Avatar';
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Change Avatar
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/128x128/1a1a2e/eaeaea?text=Avatar';
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">{profile.name}</h3>
                      <p className="text-white/60">{profile.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="px-6 py-3 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
                <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Theme Preference</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['light', 'dark', 'auto'].map(theme => (
                        <button
                          key={theme}
                          onClick={() => handleSettingsUpdate('theme', theme)}
                          className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                            settings.theme === theme
                              ? 'bg-[#5E6AD2] text-white'
                              : 'bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3">Default View</label>
                    <select
                      value={settings.defaultView}
                      onChange={(e) => handleSettingsUpdate('defaultView', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                    >
                      <option value="dashboard">Dashboard</option>
                      <option value="projects">Projects</option>
                      <option value="calendar">Calendar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3">Task Defaults</label>
                    <div className="space-y-3">
                      <select
                        value={settings.taskDefaults.priority}
                        onChange={(e) => handleSettingsUpdate('taskDefaults', { ...settings.taskDefaults, priority: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={settings.taskDefaults.autoAssign}
                          onChange={(e) => handleSettingsUpdate('taskDefaults', { ...settings.taskDefaults, autoAssign: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 bg-transparent text-[#5E6AD2] focus:ring-[#5E6AD2]"
                        />
                        <span className="text-sm">Auto-assign tasks to me</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
                <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailAlerts', label: 'Email alerts for new features' },
                    { key: 'dueDateReminders', label: 'Due date reminders' },
                    { key: 'completionNotifications', label: 'Task completion notifications' },
                    { key: 'weeklyReports', label: 'Weekly productivity reports' }
                  ].map(setting => (
                    <label key={setting.key} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notifications[setting.key]}
                        onChange={(e) => setNotifications({ ...notifications, [setting.key]: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-[#5E6AD2] focus:ring-[#5E6AD2]"
                      />
                      <span className="text-sm">{setting.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
              <h3 className="text-xl font-bold mb-6">Data Export & Privacy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Export Your Data</h4>
                  <p className="text-sm text-white/60 mb-4">Download all your tasks, projects, and settings</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => exportData('json')}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => exportData('csv')}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Delete Account</h4>
                  <p className="text-sm text-white/60 mb-4">Permanently delete your account and all data</p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-red-400"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Delete Account</h3>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: connect API endpoint using src/config/api.js
                  // fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_PROFILE}`, { method: 'DELETE' });
                  setShowDeleteModal(false);
                }}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}