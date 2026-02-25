import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white/60">© 2024 TaskFlow. All rights reserved.</div>
        <div className="flex gap-6">
          <Link to="#" className="text-white/60 hover:text-white transition-colors">Privacy</Link>
          <Link to="#" className="text-white/60 hover:text-white transition-colors">Terms</Link>
          <Link to="#" className="text-white/60 hover:text-white transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}