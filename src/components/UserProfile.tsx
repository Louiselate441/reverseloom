import React, { useState, useRef, useEffect } from 'react';
import { Camera, Save, Share2, MapPin, Edit3, Heart, Mail, Loader2, CheckCircle } from 'lucide-react';
import { ProfileData, uploadAvatar } from '@/lib/profileService';

interface User {
  name: string;
  email: string;
}

interface Props {
  user: User | null;
  profile: ProfileData | null;
  onLogin: () => void;
  onUpdate: (p: ProfileData) => Promise<void>;
}

const UserProfile: React.FC<Props> = ({ user, profile, onLogin, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData | null>(profile);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !profile) return;
    setUploading(true);
    try {
      const url = await uploadAvatar(profile.email, f);
      const next = { ...(draft || profile), avatar_url: url };
      setDraft(next);
      await onUpdate(next);
    } catch (err) {
      alert('Upload failed. Please try again.');
    }
    setUploading(false);
  };

  const shareProfile = async () => {
    if (!draft) return;
    const text = `Meet ${draft.name}, ${draft.age} from ${draft.location} on LaoDate! ${draft.bio}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'My LaoDate Profile', text }); return; } catch {}
    }
    window.location.href = `sms:?&body=${encodeURIComponent(text)}`;
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    await onUpdate(draft);
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user || !profile || !draft) {
    return (
      <section id="myprofile" className="bg-white px-5 py-20">
        <div className="mx-auto max-w-md rounded-3xl bg-gradient-to-br from-rose-50 to-amber-50 p-10 text-center shadow">
          <Heart className="mx-auto mb-4 text-rose-400" size={40} />
          <h2 className="font-serif text-2xl font-bold text-gray-800">Your Profile</h2>
          <p className="mt-2 text-gray-500">Sign in to view and edit your personal profile, upload your avatar, and save your favorites.</p>
          <button onClick={onLogin} className="mt-6 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-3 font-semibold text-white shadow-lg">
            Sign In / Sign Up
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="myprofile" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-rose-500">Your Account</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-gray-800 md:text-4xl">My Profile</h2>
          {saved && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-1.5 text-sm text-green-700">
              <CheckCircle size={15} /> Saved to your account
            </p>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-rose-100">
          <div className="h-32 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />
          <div className="px-6 pb-8 md:px-10">
            <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:gap-6">
              <div className="relative">
                <img src={draft.avatar_url} alt="avatar" className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" />
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="absolute bottom-1 right-1 rounded-full bg-rose-500 p-2 text-white shadow-md transition hover:bg-rose-600 disabled:opacity-60">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </div>
              <div className="mt-4 flex-1 text-center md:mt-0 md:pb-2 md:text-left">
                <h3 className="font-serif text-2xl font-bold text-gray-800">{draft.name}, {draft.age}</h3>
                <p className="flex items-center justify-center gap-1 text-gray-500 md:justify-start">
                  <MapPin size={15} className="text-rose-400" /> {draft.location}
                </p>
                <p className="flex items-center justify-center gap-1 text-sm text-gray-400 md:justify-start">
                  <Mail size={13} /> {user.email}
                </p>
              </div>
              <div className="mt-4 flex gap-2 md:mt-0 md:pb-2">
                <button onClick={() => { setEditing(!editing); setDraft(profile); }} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200">
                  <Edit3 size={15} /> {editing ? 'Cancel' : 'Edit'}
                </button>
                <button onClick={shareProfile} className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow">
                  <Share2 size={15} /> Share
                </button>
              </div>
            </div>

            {editing ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                <Field label="Age" value={draft.age} onChange={(v) => setDraft({ ...draft, age: v })} />
                <Field label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
                <Field label="Interests" value={draft.interests} onChange={(v) => setDraft({ ...draft, interests: v })} />
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-600">Bio</label>
                  <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-rose-500" />
                </div>
                <div className="md:col-span-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-2.5 font-semibold text-white shadow disabled:opacity-60">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-500">About Me</h4>
                  <p className="mt-1 text-gray-600">{draft.bio}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-500">Interests</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {draft.interests.split(',').filter(Boolean).map((i) => (
                      <span key={i} className="rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-500">{i.trim()}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-500">Saved Favorites</h4>
                  <p className="mt-1 flex items-center gap-1.5 text-gray-600">
                    <Heart size={15} className="fill-rose-500 text-rose-500" /> {profile.liked.length} profile{profile.liked.length === 1 ? '' : 's'} liked
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-600">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-rose-500" />
  </div>
);

export default UserProfile;
