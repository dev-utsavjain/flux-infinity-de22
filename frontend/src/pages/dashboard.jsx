import { useState, useEffect } from 'react';
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

export default function Dashboard() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', color: '#5E6AD2', active: true },
    { id: 2, name: 'Mobile App', color: '#7C3AED', active: false },
    { id: 3, name: 'Marketing Campaign', color: '#00D9FF', active: false }
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review design mockups', priority: 'high', completed: false, projectId: 1 },
    { id: 2, title: 'Update user stories', priority: 'medium', completed: true, projectId: 1 },
    { id: 3, title: 'Schedule team meeting', priority: 'low', completed: false, projectId: 2 }
  ]);
  const [todayTasks, setTodayTasks] = useState([
    { id: 4, title: 'Submit weekly report', priority: 'high', completed: false },
    { id: 5, title: 'Code review', priority: 'medium', completed: true }
  ]);
  const [quickTask, setQuickTask] = useState({ title: '', priority: 'medium', projectId: 1 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTodayTasks(todayTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const addQuickTask = (e) => {
    e.preventDefault();
    if (!quickTask.title.trim()) return;
    const newTask = { id: Date.now(), ...quickTask, completed: false };
    setTasks([...tasks, newTask]);
    setQuickTask({ title: '', priority: 'medium', projectId: 1 });
  };

  const completionRate = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      <div className="flex pt-16">
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-[#0A0A0B] border-r border-white/10 min-h-screen transition-all duration-300`}>
          <div className="p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mb-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Icon name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} className="w-5 h-5" />
            </button>
            {!sidebarCollapsed && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/60 mb-3">Projects</h3>
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => setProjects(projects.map(p => ({ ...p, active: p.id === project.id })))}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                      project.active ? 'bg-[#5E6AD2]/20 text-white' : 'hover:bg-white/5 text-white/80'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                    <span>{project.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
                <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
                <div className="space-y-3">
                  {todayTasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 rounded border-white/20 bg-transparent text-[#5E6AD2] focus:ring-[#5E6AD2]"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-white/40' : ''}`}>{task.title}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>{task.priority}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
                <h3 className="text-xl font-bold mb-4">Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion Rate</span>
                      <span>{completionRate}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-[#5E6AD2] h-2 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Streak</span>
                      <div className="flex items-center gap-2">
                        <Icon name="Flame" className="w-5 h-5 text-orange-400" />
                        <span className="font-bold">7 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
                <h3 className="text-xl font-bold mb-4">Priority Tasks</h3>
                <div className="space-y-4">
                  {['high', 'medium', 'low'].map(priority => (
                    <div key={priority}>
                      <h4 className="text-sm font-semibold text-white/60 mb-2 capitalize">{priority} Priority</h4>
                      <div className="space-y-2">
                        {tasks.filter(t => t.priority === priority).slice(0, 2).map(task => (
                          <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(task.id)}
                              className="w-4 h-4 rounded border-white/20 bg-transparent text-[#5E6AD2] focus:ring-[#5E6AD2]"
                            />
                            <span className={`flex-1 text-sm ${task.completed ? 'line-through text-white/40' : ''}`}>{task.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
                <h3 className="text-xl font-bold mb-4">Quick Add Task</h3>
                <form onSubmit={addQuickTask} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Task name..."
                    value={quickTask.title}
                    onChange={(e) => setQuickTask({ ...quickTask, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40"
                  />
                  <select
                    value={quickTask.priority}
                    onChange={(e) => setQuickTask({ ...quickTask, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg transition-colors duration-300"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}