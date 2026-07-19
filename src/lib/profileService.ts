import { supabase } from '@/lib/supabase';

export interface ProfileData {
  email: string;
  name: string;
  age: string;
  location: string;
  bio: string;
  interests: string;
  avatar_url: string;
  liked: number[];
}

export const DEFAULT_AVATAR =
  'https://d64gsuwffb70l.cloudfront.net/6a258cb45319c0cca02fae11_1780845922343_feeee23b.png';

export function emptyProfile(email: string, name: string): ProfileData {
  return {
    email,
    name: name || 'My Name',
    age: '24',
    location: 'Vientiane, Laos',
    bio: 'Hello! I love meeting new people and sharing happy moments.',
    interests: 'Travel, Music, Cooking',
    avatar_url: DEFAULT_AVATAR,
    liked: [],
  };
}

export async function loadProfile(email: string, fallbackName: string): Promise<ProfileData> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error || !data) {
    const fresh = emptyProfile(email, fallbackName);
    await saveProfile(fresh);
    return fresh;
  }

  return {
    email: data.email,
    name: data.name || fallbackName,
    age: data.age || '24',
    location: data.location || 'Vientiane, Laos',
    bio: data.bio || '',
    interests: data.interests || '',
    avatar_url: data.avatar_url || DEFAULT_AVATAR,
    liked: Array.isArray(data.liked) ? data.liked : [],
  };
}

export async function saveProfile(p: ProfileData): Promise<void> {
  await supabase.from('user_profiles').upsert(
    {
      email: p.email,
      name: p.name,
      age: p.age,
      location: p.location,
      bio: p.bio,
      interests: p.interests,
      avatar_url: p.avatar_url,
      liked: p.liked,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'email' }
  );
}

export async function uploadAvatar(email: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'png';
  const path = `${email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('avatars').upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}
