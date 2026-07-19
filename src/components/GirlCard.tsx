import React from 'react';
import { MapPin, Heart, Share2, MessageCircle } from 'lucide-react';
import { Girl } from '@/data/girls';

interface Props {
  girl: Girl;
  liked: boolean;
  onLike: (id: number) => void;
}

const GirlCard: React.FC<Props> = ({ girl, liked, onLike }) => {
  const shareSMS = async () => {
    const text = `Check out ${girl.name}, ${girl.age} from ${girl.location} on LaoDate! ${girl.bio}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${girl.name} on LaoDate`, text });
        return;
      } catch { /* fallthrough */ }
    }
    window.location.href = `sms:?&body=${encodeURIComponent(text)}`;
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={girl.image} alt={girl.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
        <button
          onClick={() => onLike(girl.id)}
          className={`absolute right-3 top-3 rounded-full p-2 shadow-md transition ${liked ? 'bg-rose-500 text-white' : 'bg-white/90 text-rose-500'}`}
        >
          <Heart size={17} className={liked ? 'fill-white' : ''} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex translate-y-4 gap-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={shareSMS} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/95 py-2 text-xs font-semibold text-gray-800 shadow">
            <Share2 size={14} /> Share SMS
          </button>
          <a href={`sms:817066887667?&body=${encodeURIComponent('Hi! I saw ' + girl.name + ' on LaoDate')}`} className="flex items-center justify-center rounded-full bg-rose-500 px-3 py-2 text-white shadow">
            <MessageCircle size={15} />
          </a>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-gray-800">{girl.name}, {girl.age}</h3>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} className="text-rose-400" /> {girl.location}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {girl.interests.map((i) => (
            <span key={i} className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-500">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GirlCard;
