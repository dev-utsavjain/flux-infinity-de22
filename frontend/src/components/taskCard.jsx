import { useState } from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function TaskCard({ task, onToggle, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);

  const handleToggle = () => {
    setCompleted(!completed);
    onToggle(task.id, !completed);
  };

  const priorityColor = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500'
  };

  return (
    <div className={`bg-white/5 border-l-4 ${priorityColor[task.priority]} rounded-lg p-4 flex items-center gap-4 hover:bg-white/10 transition`}>
      <button onClick={handleToggle} className="flex-shrink-0">
        <Icon name={completed ? 'CheckCircle' : 'Circle'} className={`w-5 h-5 ${completed ? 'text-[#5E6AD2]' : 'text-white/40'}`} />
      </button>
      <div className="flex-1">
        <p className={`text-white ${completed ? 'line-through opacity-60' : ''}`}>{task.title}</p>
        <p className="text-xs text-white/50 mt-1">{task.project} · Due {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <button onClick={() => onDelete(task.id)} className="text-white/40 hover:text-red-500 transition">
        <Icon name="Trash2" className="w-4 h-4" />
      </button>
    </div>
  );
}