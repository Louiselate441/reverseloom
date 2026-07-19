import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeroSlider from './HeroSlider';
import ProfileGrid from './ProfileGrid';
import UserProfile from './UserProfile';
import ContactForm from './ContactForm';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import AuthModal from './AuthModal';
import { loadProfile, saveProfile, ProfileData } from '@/lib/profileService';

const AppLayout: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem('laodate_session');
    if (stored) {
      try {
        const s = JSON.parse(stored);
        if (s?.email) handleAuth(s.name, s.email);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuth = async (name: string, email: string) => {
    setUser({ name, email });
    localStorage.setItem('laodate_session', JSON.stringify({ name, email }));
    const p = await loadProfile(email, name);
    setProfile(p);
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('laodate_session');
  };

  const updateProfile = async (next: ProfileData) => {
    setProfile(next);
    await saveProfile(next);
  };

  const toggleLike = async (id: number) => {
    if (!profile) {
      setAuthOpen(true);
      return;
    }
    const liked = profile.liked.includes(id)
      ? profile.liked.filter((x) => x !== id)
      : [...profile.liked, id];
    await updateProfile({ ...profile, liked });
  };

  const goProfile = () => document.getElementById('myprofile')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header user={user} onLogin={() => setAuthOpen(true)} onProfile={goProfile} onLogout={handleLogout} />
      <HeroSlider onJoin={() => setAuthOpen(true)} />
      <ProfileGrid liked={profile?.liked || []} onLike={toggleLike} />
      <UserProfile user={user} profile={profile} onLogin={() => setAuthOpen(true)} onUpdate={updateProfile} />
      <ContactForm />
      <Footer />
      <FloatingButtons />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={handleAuth} />
    </div>
  );
};

export default AppLayout;
