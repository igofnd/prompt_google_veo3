
import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import InvitationSection from './components/InvitationSection';
import EventSection from './components/EventSection';
import GallerySection from './components/GallerySection';
import GiftSection from './components/GiftSection';
import RsvpSection from './components/RsvpSection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const audioEl = document.getElementById('background-music') as HTMLAudioElement;
    if (isInvitationOpen) {
      document.body.style.overflow = 'auto';
      audioEl.play().then(() => setIsMusicPlaying(true)).catch(e => console.error("Audio play failed:", e));
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isInvitationOpen]);

  const toggleMusic = () => {
    const audioEl = document.getElementById('background-music') as HTMLAudioElement;
    if (isMusicPlaying) {
      audioEl.pause();
    } else {
      audioEl.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };
  
  const openInvitation = () => {
    setIsInvitationOpen(true);
  };

  return (
    <div className="bg-[#F8F4F1] text-[#4B3F38] min-h-screen">
      <HeroSection isOpen={isInvitationOpen} onOpen={openInvitation} />
      
      <main className={`transition-opacity duration-1000 ${isInvitationOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <InvitationSection />
        <EventSection />
        <GallerySection />
        <GiftSection />
        <RsvpSection />
        <Footer />
      </main>

      {isInvitationOpen && <MusicPlayer isPlaying={isMusicPlaying} onToggle={toggleMusic} />}
    </div>
  );
};

export default App;
