import { useState } from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function QuickAddForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [project, setProject] = useState('Website Redesign');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, priority, project, completed: false, dueDate: new Date().toISOString() });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4">Quick Add Task</h3>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task name..."
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition"
        />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition"
          >
            <option>Website Redesign</option>
            <option>Mobile App</option>
            <option>Marketing Campaign</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] hover:opacity-90 text-white rounded-lg transition active:scale-95"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Add Task
        </button>
      </div>
    </form>
  );
}