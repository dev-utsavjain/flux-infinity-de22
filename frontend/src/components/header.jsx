import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link to="/dashboard" className="text-white font-semibold text-lg flex items-center gap-2">
          <Icon name="LayoutDashboard" className="w-5 h-5 text-[#5E6AD2]" />
          Task Manager
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link to="/projects" className="hover:text-white transition">Projects</Link>
          <Link to="/analytics" className="hover:text-white transition">Analytics</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-white/80 hover:text-white transition">
            <Icon name="Bell" className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#5E6AD2]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=64&h=64&fit=crop&auto=format"
              alt="User avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/64x64/5E6AD2/ffffff?text=U';
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}