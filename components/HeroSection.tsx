import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  isOpen: boolean;
  onOpen: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isOpen, onOpen }) => {
  const [guestName, setGuestName] = useState('Guest');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to.replace(/\+/g, ' '));
    }
  }, []);

  // Set a fixed date for the wedding
  const weddingDay = new Date('2025-07-11T00:00:00');

  const displayDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(weddingDay);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center text-white transition-transform duration-1000 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ backgroundImage: `url(https://picsum.photos/seed/weddingcouple/1200/800)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center p-4 animate-fade-in">
        <p className="text-lg md:text-xl mb-4">THE WEDDING OF</p>
        <h1 className="font-dancing text-6xl md:text-8xl font-bold mb-4">Hadi & Puji</h1>
        <p className="text-lg md:text-xl mb-8">{displayDate}</p>
        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg inline-block">
            <p className="text-sm md:text-base mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <h2 className="text-2xl md:text-3xl font-bold">{guestName}</h2>
        </div>
        <button
          onClick={onOpen}
          className="mt-8 px-8 py-3 bg-[#C0A080] hover:bg-[#A98C70] text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
};

export default HeroSection;