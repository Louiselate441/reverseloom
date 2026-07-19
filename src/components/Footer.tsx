import React, { useState } from 'react';
import { Heart, MapPin, Phone, MessageSquare, Send, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      await fetch('https://famous.ai/api/crm/6a258cb45319c0cca02fae11/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer-signup', tags: ['newsletter', 'laodate'] }),
      });
    } catch {}
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500">
              <Heart size={18} className="fill-white text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-white">LaoDate</span>
          </div>
          <p className="mt-4 text-sm text-gray-400">Connecting hearts across Laos. Find your perfect match with amazing Lao girls.</p>
          <div className="mt-5 flex gap-3">
            <a href="sms:817066887667" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-rose-500" title="Send SMS">
              <MessageSquare size={18} />
            </a>
            <a href="sms:817066887667?&body=Hello%20LaoDate" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-rose-500" title="Text us">
              <Send size={18} />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-rose-500">
              <Facebook size={18} />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-rose-500">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="transition hover:text-rose-400">Home</a></li>
            <li><a href="#profiles" className="transition hover:text-rose-400">Profiles</a></li>
            <li><a href="#myprofile" className="transition hover:text-rose-400">My Profile</a></li>
            <li><a href="#contact" className="transition hover:text-rose-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-rose-400" /> Ban Phonepheng, Khamkeuth, Bolikhamxay, Laos PDR</li>
            <li><a href="tel:+8562055890980" className="flex items-center gap-2 hover:text-rose-400"><Phone size={16} className="text-rose-400" /> (856-20) 55890980</a></li>
            <li><a href="sms:817066887667" className="flex items-center gap-2 hover:text-rose-400"><MessageSquare size={16} className="text-rose-400" /> SMS: 817066887667</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Newsletter</h4>
          <p className="mb-3 text-sm text-gray-400">Subscribe for new profiles & updates.</p>
          <form onSubmit={subscribe} className="flex overflow-hidden rounded-full bg-gray-800">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full bg-transparent px-4 py-2.5 text-sm outline-none" />
            <button type="submit" className="bg-gradient-to-r from-rose-500 to-amber-500 px-4 text-white"><Send size={16} /></button>
          </form>
          {done && <p className="mt-2 text-xs text-green-400">Subscribed! Thank you.</p>}
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        Copyright &copy; 2569 By: B&amp;T. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
