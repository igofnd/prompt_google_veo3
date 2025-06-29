
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 text-center text-white bg-cover bg-center" style={{backgroundImage: `url(https://picsum.photos/seed/footerbg/1200/400)`}}>
        <div className="absolute inset-x-0 bottom-0 h-full bg-black bg-opacity-50"></div>
        <div className="relative z-10">
            <p className="max-w-xl mx-auto mb-6 text-sm md:text-base">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
            </p>
            <p className="mb-4">Atas kehadiran dan doa restu, kami ucapkan terima kasih.</p>
            <p className="mb-8">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
            <h2 className="font-dancing text-5xl md:text-6xl">Hadi & Puji</h2>
            <p className="mt-8 text-xs">&copy; 2023. Made with ❤️</p>
        </div>
    </footer>
  );
};

export default Footer;