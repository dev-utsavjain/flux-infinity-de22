import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState({
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    color: '#5E6AD2',
    tasks: [
      { id: 1, title: 'Create wireframes', description: 'Design low-fidelity wireframes for all pages', priority: 'high', completed: true, order: 1, createdAt: '2024-01-15T10:00:00Z' },
      { id: 2, title: 'Design mockups', description: 'High-fidelity design mockups in Figma', priority: 'high', completed: true, order: 2, createdAt: '2024-01-16T14:30:00Z' },
      { id: 3, title: 'Develop homepage', description: 'Code the homepage with responsive design', priority: 'medium', completed: false, order: 3, createdAt: '2024-01-17T09:15:00Z' },
      { id: 4, title: 'Implement navigation', description: 'Build responsive navigation component', priority: 'medium', completed: false, order: 4, createdAt: '2024-01-18T11:20:00Z' },
      { id: 5, title: 'Add animations', description: 'Smooth transitions and micro-interactions', priority: 'low', completed: false, order: 5, createdAt: '2024-01-19T16:45:00Z' }
    ]
  });
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [draggedTask, setDraggedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const completedCount = project.tasks.filter(t => t.completed).length;
  const completionRate = Math.round((completedCount / project.tasks.length) * 100);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetTask) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === targetTask.id) return;

    const newTasks = [...project.tasks];
    const draggedIndex = newTasks.findIndex(t => t.id === draggedTask.id);
    const targetIndex = newTasks.findIndex(t => t.id === targetTask.id);
    
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);
    
    const reorderedTasks = newTasks.map((task, index) => ({ ...task, order: index + 1 }));
    setProject({ ...project, tasks: reorderedTasks });
    setDraggedTask(null);

    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS_REORDER}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ projectId: id, taskIds: reorderedTasks.map(t => t.id) })
    // });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      order: project.tasks.length + 1,
      createdAt: new Date().toISOString()
    };

    setProject({ ...project, tasks: [...project.tasks, task] });
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const toggleTask = (taskId) => {
    setProject({
      ...project,
      tasks: project.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    });
  };

  const deleteTask = (taskId) => {
    setProject({
      ...project,
      tasks: project.tasks.filter(t => t.id !== taskId)
    });
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
                <h1 className="text-4xl font-bold">{project.name}</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                  <Icon name="Edit" className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                  <Icon name="Archive" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Icon name="Trash2" className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Total Tasks</span>
                  <Icon name="List" className="w-5 h-5 text-white/40" />
                </div>
                <p className="text-3xl font-bold">{project.tasks.length}</p>
              </div>
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Completed</span>
                  <Icon name="CheckCircle" className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold">{completedCount}</p>
              </div>
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Progress</span>
                  <Icon name="TrendingUp" className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Task List</h2>
                <div className="space-y-3">
                  {project.tasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, task)}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 cursor-move hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 mt-1 rounded border-white/20 bg-transparent text-[#5E6AD2] focus:ring-[#5E6AD2]"
                          />
                          <div className="flex-1">
                            <h3 className={`font-semibold ${task.completed ? 'line-through text-white/40' : ''}`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-white/60 mt-1">{task.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Icon name="X" className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>{task.priority}</span>
                        {task.dueDate && (
                          <span className="text-xs text-white/60">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Activity Timeline</h3>
                <div className="space-y-4">
                  {project.tasks.slice(0, 3).map(task => (
                    <div key={task.id} className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-[#5E6AD2] rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{task.title}</span>
                          {task.completed ? ' completed' : ' created'}
                        </p>
                        <p className="text-xs text-white/60">
                          {new Date(task.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Add New Task</h3>
                <form onSubmit={addTask} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40"
                  />
                  <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white placeholder-white/40 h-24 resize-none"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] text-white"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg transition-colors duration-300"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-4">Delete Project</h3>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete "{project.name}"? This action cannot be undone.
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
                  // fetch(`${API_BASE_URL}${API_ENDPOINTS.PROJECTS}/${id}`, { method: 'DELETE' });
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