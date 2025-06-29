
import React, { useState } from 'react';
import { Wish } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';

const initialWishes: Wish[] = [
  { id: 1, name: 'Budi & Keluarga', attendance: 'Hadir', message: 'Selamat Hadi & Puji! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Kami pasti datang!' },
  { id: 2, name: 'Siti Aminah', attendance: 'Hadir', message: 'Congrats for your wedding! Wishing you a lifetime of love and happiness.' },
  { id: 3, name: 'Andi Wijaya', attendance: 'Tidak Hadir', message: 'Selamat ya! Mohon maaf belum bisa hadir, semoga acaranya lancar. Doa terbaik untuk kalian berdua.' },
];

const RsvpSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir' | 'Ragu-ragu'>('Hadir');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      const newWish: Wish = {
        id: wishes.length + 1,
        name,
        message,
        attendance,
      };
      setWishes([newWish, ...wishes]);
      setName('');
      setMessage('');
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <BookOpenIcon className="w-16 h-16 mx-auto mb-6 text-[#C0A080]" />
        <h2 className="font-dancing text-5xl mb-4">Buku Tamu</h2>
        <p className="mb-10">Kirimkan doa dan ucapan restu Anda untuk kedua mempelai.</p>
        
        <div className="bg-gray-50 p-8 rounded-lg shadow-inner text-left">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">Nama</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0A080]" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-bold mb-2">Ucapan & Doa</label>
              <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0A080]" required></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Konfirmasi Kehadiran</label>
              <div className="flex gap-4">
                {['Hadir', 'Tidak Hadir', 'Ragu-ragu'].map(option => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="radio" name="attendance" value={option} checked={attendance === option} onChange={() => setAttendance(option as any)} className="form-radio text-[#C0A080] focus:ring-[#C0A080]"/>
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-[#C0A080] text-white font-bold rounded-lg hover:bg-[#A98C70] transition-colors">Kirim Ucapan</button>
          </form>
        </div>

        <div className="mt-12 text-left max-h-96 overflow-y-auto pr-4">
          <h3 className="font-bold text-xl mb-4 text-center">Ucapan ({wishes.length})</h3>
          <div className="space-y-4">
            {wishes.map(wish => (
              <div key={wish.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#C0A080]">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold">{wish.name}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    wish.attendance === 'Hadir' ? 'bg-green-100 text-green-800' : 
                    wish.attendance === 'Tidak Hadir' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {wish.attendance}
                  </span>
                </div>
                <p className="text-gray-600">{wish.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;