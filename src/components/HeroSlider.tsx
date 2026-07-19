import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { heroSlides } from '@/data/girls';

const slogans = [
  { title: 'Find Your Lao Sweetheart', sub: 'Meet amazing Lao girls ready to connect with you today.' },
  { title: 'Love Starts Here', sub: 'Beautiful smiles, warm hearts, genuine connections.' },
  { title: 'Your Perfect Match Awaits', sub: 'Join thousands finding love across Laos PDR.' },
];

const HeroSlider: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);

  return (
    <section id="home" className="relative h-[88vh] min-h-[520px] w-full overflow-hidden">
      {heroSlides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={src} alt="slide" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-rose-900/40" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-20 max-w-3xl">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-500/90 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
          <Heart size={15} className="fill-white" /> Amazing Lao Girls Date
        </span>
        <h1 className="font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl">
          {slogans[index].title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-rose-100 md:text-xl">{slogans[index].sub}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={onJoin}
            className="rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-3.5 font-semibold text-white shadow-xl transition hover:scale-105 hover:shadow-rose-500/40"
          >
            Join Free Today
          </button>
          <a
            href="#profiles"
            className="rounded-full border-2 border-white/70 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Browse Profiles
          </a>
        </div>
      </div>

      <button onClick={() => go(-1)} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition hover:bg-white/40">
        <ChevronLeft size={26} />
      </button>
      <button onClick={() => go(1)} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition hover:bg-white/40">
        <ChevronRight size={26} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-rose-400' : 'w-2.5 bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
