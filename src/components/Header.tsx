import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface Props {
  user: { name: string; email: string } | null;
  onLogin: () => void;
  onProfile: () => void;
  onLogout: () => void;
}

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'My Profile', href: '#myprofile' },
  { label: 'Contact', href: '#contact' },
];

const Header: React.FC<Props> = ({ user, onLogin, onProfile, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all ${scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500">
            <Heart size={18} className="fill-white text-white" />
          </div>
          <span className={`font-serif text-xl font-bold ${scrolled ? 'text-rose-600' : 'text-white'}`}>LaoDate</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition hover:text-rose-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <button onClick={onProfile} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow">
                <UserIcon size={16} /> {user.name}
              </button>
              <button onClick={onLogout} title="Log out" className={`rounded-full p-2 transition hover:bg-rose-50 ${scrolled ? 'text-gray-600' : 'text-white'}`}>
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <button onClick={onLogin} className="rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-5 py-2 text-sm font-semibold text-white shadow">
              Sign In
            </button>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? 'text-gray-800' : 'text-white'}`}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-5 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-gray-700">
              {l.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); user ? onProfile() : onLogin(); }} className="mt-2 w-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 py-2.5 font-semibold text-white">
            {user ? `Hi, ${user.name}` : 'Sign In'}
          </button>
          {user && (
            <button onClick={() => { setOpen(false); onLogout(); }} className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 font-semibold text-gray-700">
              <LogOut size={16} /> Log Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
