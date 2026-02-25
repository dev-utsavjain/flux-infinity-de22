import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function ProgressOverview({ tasks }) {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Progress Overview</h3>
        <Icon name="TrendingUp" className="w-5 h-5 text-[#00D9FF]" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm text-white/70 mb-2">
            <span>Completion Rate</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#5E6AD2] to-[#00D9FF] h-2 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{completed}</p>
            <p className="text-xs text-white/60">Completed</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">7</p>
            <p className="text-xs text-white/60">Day Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}