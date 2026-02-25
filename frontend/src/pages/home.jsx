import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

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

const AnimatedTaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design new landing page', completed: false },
    { id: 2, text: 'Review pull requests', completed: true },
    { id: 3, text: 'Update documentation', completed: false },
    { id: 4, text: 'Plan sprint backlog', completed: false }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(prev => {
        const incomplete = prev.filter(t => !t.completed);
        if (incomplete.length === 0) return prev.map(t => ({ ...t, completed: false }));
        const randomIndex = Math.floor(Math.random() * incomplete.length);
        return prev.map(t => t.id === incomplete[randomIndex].id ? { ...t, completed: true } : t);
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed ? 'bg-[#5E6AD2] border-[#5E6AD2]' : 'border-white/20'
            }`}>
              {task.completed && <Icon name="Check" className="w-3 h-3 text-white" />}
            </div>
            <span className={`transition-all duration-300 ${task.completed ? 'text-white/40 line-through' : 'text-white'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    { name: 'Sarah Chen', role: 'Product Manager', quote: 'Increased my productivity by 40%. The drag-drop interface is incredibly intuitive.', company: 'TechCorp' },
    { name: 'Mike Rodriguez', role: 'Developer', quote: 'Best task manager I\'ve used. The timeline view helps me stay on track with deadlines.', company: 'DevStudio' },
    { name: 'Emma Thompson', role: 'Designer', quote: 'The project organization features are game-changing. My team collaboration has never been better.', company: 'DesignHub' }
  ];

  const features = [
    { icon: 'CheckCircle', title: 'Smart Task Tracking', desc: 'AI-powered suggestions for task prioritization and scheduling' },
    { icon: 'Users', title: 'Team Collaboration', desc: 'Share projects, assign tasks, and track progress together' },
    { icon: 'BarChart3', title: 'Progress Analytics', desc: 'Visual dashboards showing productivity metrics and trends' },
    { icon: 'Clock', title: 'Time Management', desc: 'Built-in pomodoro timer and time tracking for better focus' },
    { icon: 'Bell', title: 'Smart Notifications', desc: 'Contextual reminders based on deadlines and work patterns' },
    { icon: 'Shield', title: 'Data Security', desc: 'Enterprise-grade encryption and privacy protection' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-hidden">
      <Header />
      
      <main className="pt-16">
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#5E6AD2] rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#7C3AED] rounded-full filter blur-3xl animate-pulse delay-2000" />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Master Your
                  <span className="text-[#5E6AD2] block">Productivity</span>
                </h1>
                <p className="text-xl text-white/80 max-w-lg">
                  The intelligent task manager that adapts to your workflow. Organize, prioritize, and accomplish more with AI-powered insights.
                </p>
                <div className="flex gap-4">
                  <Link to="/signup" className="px-8 py-4 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    Get Started Free
                  </Link>
                  <button className="px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="lg:pl-12">
                <AnimatedTaskList />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Everything You Need</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">Powerful features designed to streamline your workflow and boost productivity</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 backdrop-blur-lg hover:border-[#5E6AD2]/50 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-[#5E6AD2]/20 rounded-2xl flex items-center justify-center mb-6">
                    <Icon name={feature.icon} className="w-8 h-8 text-[#5E6AD2]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-white/80">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-[#0A0A0B]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-white/80">Get started in minutes with our intuitive workflow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-[#5E6AD2]/20 rounded-3xl flex items-center justify-center mx-auto">
                  <Icon name="Plus" className="w-12 h-12 text-[#5E6AD2]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">1. Create Tasks</h3>
                  <p className="text-white/80">Add tasks with natural language. Our AI understands context and suggests optimal scheduling.</p>
                </div>
              </div>
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-[#7C3AED]/20 rounded-3xl flex items-center justify-center mx-auto">
                  <Icon name="Layout" className="w-12 h-12 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">2. Organize Projects</h3>
                  <p className="text-white/80">Group tasks into projects with drag-and-drop simplicity. Set priorities and deadlines effortlessly.</p>
                </div>
              </div>
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-[#00D9FF]/20 rounded-3xl flex items-center justify-center mx-auto">
                  <Icon name="CheckCircle" className="w-12 h-12 text-[#00D9FF]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">3. Achieve Goals</h3>
                  <p className="text-white/80">Track progress with visual analytics. Celebrate achievements and maintain momentum.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-16">Loved by Teams Worldwide</h2>
              <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-12 backdrop-blur-lg">
                <div className="mb-8">
                  <Icon name="Quote" className="w-12 h-12 text-[#5E6AD2] mx-auto mb-6" />
                  <p className="text-2xl md:text-3xl text-white/90 italic mb-8">"{testimonials[currentTestimonial].quote}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={`https://images.unsplash.com/photo-${['1494790108755-2616b612b5be', '1507003211169-0a1dd7228f2d', '1438761681033-6461ffad8d80'][currentTestimonial]}?w=64&h=64&fit=crop&auto=format`}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/64x64/1a1a2e/eaeaea?text=Photo';
                      }}
                    />
                    <div className="text-left">
                      <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                      <p className="text-white/60">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-[#5E6AD2] w-8' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-[#5E6AD2]/20 to-[#7C3AED]/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Join thousands of users who have transformed their productivity. Start your free trial today.</p>
            <Link to="/signup" className="inline-flex items-center gap-3 px-8 py-4 bg-[#5E6AD2] hover:bg-[#5E6AD2]/80 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Start Free Trial
              <Icon name="ArrowRight" className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}