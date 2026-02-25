import { useState } from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const mockProjects = [
  { id: 1, name: 'Website Redesign', color: 'bg-[#5E6AD2]' },
  { id: 2, name: 'Mobile App', color: 'bg-[#7C3AED]' },
  { id: 3, name: 'Marketing Campaign', color: 'bg-[#00D9FF]' },
  { id: 4, name: 'Q4 Planning', color: 'bg-[#F0C020]' }
];

export default function Sidebar({ activeProject, onProjectSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-[#0A0A0B] border-r border-white/10 h-full flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && <h2 className="text-white font-semibold">Projects</h2>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/60 hover:text-white transition">
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {mockProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => onProjectSelect(project.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${activeProject === project.id ? 'bg-[#5E6AD2]/20 text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <div className={`w-3 h-3 rounded-full ${project.color}`} />
            {!collapsed && <span className="truncate">{project.name}</span>}
          </button>
        ))}
      </nav>
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#5E6AD2]/20 hover:bg-[#5E6AD2]/30 text-white rounded-lg transition">
            <Icon name="Plus" className="w-4 h-4" />
            New Project
          </button>
        </div>
      )}
    </aside>
  );
}