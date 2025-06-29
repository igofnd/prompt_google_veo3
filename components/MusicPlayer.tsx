
import React from 'react';
import { MusicOnIcon } from './icons/MusicOnIcon';
import { MusicOffIcon } from './icons/MusicOffIcon';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-[#C0A080] rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none"
      aria-label="Toggle Music"
    >
      {isPlaying ? (
        <MusicOnIcon className="w-6 h-6 animate-spin-slow" />
      ) : (
        <MusicOffIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default MusicPlayer;
