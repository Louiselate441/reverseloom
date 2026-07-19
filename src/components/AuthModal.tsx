import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const VALID_EMAIL = 'sbounethone7851@gmail.com';

interface Props {
  open: boolean;
  onClose: () => void;
  onAuth: (name: string, email: string) => void;
}

const AuthModal: React.FC<Props> = ({ open, onClose, onAuth }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const strength = (() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const validate = () => {
    const e: Record<string, string> = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mode === 'signup' && name.trim().length < 2) e.name = 'Please enter your name';
    if (!emailRe.test(email)) e.email = 'Enter a valid email address';
    else if (mode === 'login' && email.trim().toLowerCase() !== VALID_EMAIL)
      e.email = 'Email not registered. Use the demo account.';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onAuth(name || email.split('@')[0], email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-6 text-white">
          <button onClick={onClose} className="absolute right-4 top-4 text-white/80 hover:text-white">
            <X size={22} />
          </button>
          <h2 className="font-serif text-2xl font-bold">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-sm text-rose-100">{mode === 'login' ? 'Sign in to continue your journey' : 'Join the Lao dating community'}</p>
        </div>

        <form onSubmit={submit} className="space-y-4 p-6">
          {mode === 'login' && (
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              Demo login: <b>{VALID_EMAIL}</b> with any 6+ char password.
            </div>
          )}
          {mode === 'signup' && (
            <div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-rose-500">
                <User size={18} className="text-gray-400" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full py-2.5 outline-none" />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-rose-500">
              <Mail size={18} className="text-gray-400" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full py-2.5 outline-none" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-rose-500">
              <Lock size={18} className="text-gray-400" />
              <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full py-2.5 outline-none" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            {mode === 'signup' && password && (
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={`h-1.5 flex-1 rounded-full ${strength >= n ? ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][strength - 1] : 'bg-gray-200'}`} />
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 py-3 font-semibold text-white shadow-lg transition hover:opacity-90">
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
          <p className="text-center text-sm text-gray-500">
            {mode === 'login' ? "Don't have an account? " : 'Already a member? '}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }} className="font-semibold text-rose-500">
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
