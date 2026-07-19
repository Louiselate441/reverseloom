import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { girls } from '@/data/girls';
import GirlCard from './GirlCard';

const locations = ['All', 'Vientiane', 'Luang Prabang', 'Pakse', 'Savannakhet', 'Vang Vieng', 'Bolikhamxay'];

interface Props {
  liked: number[];
  onLike: (id: number) => void;
}

const ProfileGrid: React.FC<Props> = ({ liked, onLike }) => {
  const [loc, setLoc] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      girls.filter(
        (g) =>
          (loc === 'All' || g.location === loc) &&
          (g.name.toLowerCase().includes(query.toLowerCase()) || g.interests.join(' ').toLowerCase().includes(query.toLowerCase()))
      ),
    [loc, query]
  );

  return (
    <section id="profiles" className="bg-gradient-to-b from-rose-50 to-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-rose-500">Meet Singles</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-gray-800 md:text-4xl">Amazing Lao Girls</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">Browse beautiful, genuine profiles and start a real connection today.</p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex w-full max-w-sm items-center gap-2 rounded-full border border-gray-200 bg-white px-4 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or interest..." className="w-full py-2.5 outline-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {locations.map((l) => (
              <button
                key={l}
                onClick={() => setLoc(l)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${loc === l ? 'bg-rose-500 text-white shadow' : 'bg-white text-gray-600 hover:bg-rose-50'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g) => (
            <GirlCard key={g.id} girl={g} liked={liked.includes(g.id)} onLike={onLike} />
          ))}
        </div>
        {filtered.length === 0 && <p className="py-10 text-center text-gray-400">No profiles match your search.</p>}
      </div>
    </section>
  );
};

export default ProfileGrid;
