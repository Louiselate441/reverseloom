import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle, User, Mail, MessageSquare } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.message.trim().length < 5) e.message = 'Message too short';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await fetch('https://famous.ai/api/crm/6a258cb45319c0cca02fae11/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.name, source: 'contact-form', tags: ['contact', 'laodate'] }),
      });
    } catch {}
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-white to-rose-50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-rose-500">Get In Touch</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-gray-800 md:text-4xl">Contact Us</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-3xl bg-gradient-to-br from-rose-500 to-amber-500 p-8 text-white shadow-xl">
            <h3 className="font-serif text-2xl font-bold">Visit Our Office</h3>
            <p className="text-rose-100">We'd love to hear from you. Reach out anytime!</p>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0" size={22} />
              <p>Ban Phonepheng, Khamkeuth,<br />Bolikhamxay, Laos PDR</p>
            </div>
            <a href="tel:+8562055890980" className="flex items-center gap-3 transition hover:text-white">
              <Phone size={22} /> (856-20) 55890980
            </a>
            <a href="sms:817066887667" className="flex items-center gap-3 transition hover:text-white">
              <MessageSquare size={22} /> SMS: 817066887667
            </a>
          </div>

          <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-8 shadow-xl">
            {sent && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700">
                <CheckCircle size={18} /> Message sent! We'll reply soon.
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-rose-500">
                <User size={17} className="text-gray-400" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full py-2.5 outline-none" />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-rose-500">
                <Mail size={17} className="text-gray-400" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" className="w-full py-2.5 outline-none" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-rose-500">
              <Phone size={17} className="text-gray-400" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="w-full py-2.5 outline-none" />
            </div>
            <div>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Your Message" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-rose-500" />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60">
              <Send size={17} /> {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
