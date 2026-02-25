import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-[#050506]/80 backdrop-blur-lg border-b border-white/10">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="text-white font-bold text-xl">Task Manager</Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-white hover:text-[#5E6AD2] transition-colors duration-300">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg transition-colors duration-300">Sign Up</Link>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#050506] border-t border-white/10 py-8 mt-12">
    <div className="container mx-auto px-4 md:px-6 text-center text-white/60">
      <p>&copy; 2024 Task Manager. All rights reserved.</p>
    </div>
  </footer>
);

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    setLoading(true);
    
    // TODO: connect API endpoint using src/config/api.js
    // const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_SIGNUP}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
    // });
    
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      
      <main className="flex items-center justify-center py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-white/60">Join thousands of productive users</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded border-white/20 bg-transparent text-[#5E6AD2] focus:ring-[#5E6AD2]"
                  />
                  <label htmlFor="terms" className="text-sm text-white/80">
                    I accept the{' '}
                    <a href="#" className="text-[#5E6AD2] hover:text-[#5E6AD2]/80">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-[#5E6AD2] hover:text-[#5E6AD2]/80">Privacy Policy</a>
                  </label>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="text-sm text-blue-300">
                      <p className="font-medium mb-1">Email Verification Required</p>
                      <p>You'll receive a verification email after signing up. Please check your inbox and spam folder.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#0A0A0B] text-white/60">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <Icon name="Chrome" className="w-5 h-5" />
                    <span>Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <Icon name="Github" className="w-5 h-5" />
                    <span>GitHub</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/60">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#5E6AD2] hover:text-[#5E6AD2]/80 font-medium">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}