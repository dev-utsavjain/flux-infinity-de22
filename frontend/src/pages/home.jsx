import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => (
  <header className="sticky top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-[#F0F2FF]/50">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="text-[#5E6AD2] font-bold text-xl">TaskFlow</Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-700 hover:text-[#5E6AD2] transition-colors duration-300">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg transition-colors duration-300">Sign Up</Link>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#F0F2FF] border-t border-[#F0F2FF]/50 py-8 mt-12">
    <div className="container mx-auto px-4 md:px-6 text-center text-slate-600">
      <p>&copy; 2024 TaskFlow. All rights reserved.</p>
    </div>
  </footer>
);

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design new landing page', completed: false },
    { id: 2, text: 'Review pull requests', completed: true },
    { id: 3, text: 'Update documentation', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const remaining = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F0F2FF] text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">TaskFlow</h1>
          <p className="text-xl text-slate-600 max-w-xl mx-auto">Your intelligent task manager for seamless productivity</p>
        </section>

        <section className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-6 py-4 bg-white/60 border border-[#5E6AD2]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition-all duration-300 text-lg"
            />
            <button
              onClick={addTask}
              className="px-6 py-4 bg-[#5E6AD2] hover:bg-[#5E6AD2]/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Icon name="Plus" className="w-5 h-5" />
              Add
            </button>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-6">
          <div className="flex gap-3 justify-center">
            {['All', 'Active', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === tab
                    ? 'bg-[#5E6AD2] text-white shadow-lg'
                    : 'bg-white/60 text-slate-600 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format"
                alt="Empty tasks"
                className="w-64 mx-auto mb-6 rounded-2xl shadow-soft"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x300/F0F2FF/5E6AD2?text=No+Tasks';
                }}
              />
              <p className="text-slate-500 text-lg">No tasks here. Add your first task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 bg-white/60 border border-[#5E6AD2]/10 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-soft"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      task.completed
                        ? 'bg-[#00D4AA] border-[#00D4AA]'
                        : 'border-[#5E6AD2]/30 hover:border-[#5E6AD2]'
                    }`}
                  >
                    {task.completed && <Icon name="Check" className="w-4 h-4 text-white" />}
                  </button>
                  <span className={`flex-1 transition-all duration-300 ${
                    task.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                  }`}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors duration-300 p-1 rounded-lg hover:bg-red-50"
                  >
                    <Icon name="X" className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {tasks.length > 0 && (
          <section className="max-w-3xl mx-auto mt-8 text-center">
            <p className="text-slate-600">
              {remaining === 0 ? 'All tasks completed!' : `${remaining} item${remaining === 1 ? '' : 's'} left`}
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}