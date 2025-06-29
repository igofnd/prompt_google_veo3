import React, { useState, useEffect } from 'react';
import { CalendarIcon } from './icons/CalendarIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { FlowerIcon } from './icons/FlowerIcon';

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval, index) => {
      const value = timeLeft[interval as keyof typeof timeLeft];
        return (
            <div key={index} className="flex flex-col items-center justify-center bg-white bg-opacity-70 rounded-lg p-3 w-20 h-20 shadow-md">
                <span className="text-3xl font-bold text-[#4B3F38]">{value}</span>
                <span className="text-xs uppercase text-[#4B3F38]">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center space-x-2 md:space-x-4 my-8">
            {timerComponents.length ? timerComponents : <span>Acara Telah Selesai</span>}
        </div>
    );
};

const EventSection: React.FC = () => {
  // Set a fixed date for the wedding
  const weddingDay = new Date('2025-07-11T00:00:00');

  const akadDate = new Date(weddingDay);
  akadDate.setHours(9, 0, 0, 0);

  const resepsiDate = new Date(weddingDay);
  resepsiDate.setHours(11, 0, 0, 0);

  const weddingDate = akadDate.toISOString().slice(0, 19);

  const displayDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(weddingDay);

  const formatGCalDate = (date: Date) => {
    // Converts a date to YYYYMMDDTHHMMSSZ format
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
  };

  const gCalAkadStart = new Date(akadDate);
  const gCalAkadEnd = new Date(akadDate);
  gCalAkadEnd.setHours(gCalAkadEnd.getHours() + 1); // 1 hour duration

  const gCalResepsiStart = new Date(resepsiDate);
  const gCalResepsiEnd = new Date(resepsiDate);
  gCalResepsiEnd.setHours(gCalResepsiEnd.getHours() + 2); // 2 hour duration

  const gCalLinkAkad = `https://www.google.com/calendar/render?action=TEMPLATE&text=Akad%20Nikah%20Hadi%20%26%20Puji&dates=${formatGCalDate(gCalAkadStart)}/${formatGCalDate(gCalAkadEnd)}&details=Akad%20Nikah%20Hadi%20%26%20Puji&location=Hotel%20Grand%20Tjokro,%20Bandung`;
  const gCalLinkResepsi = `https://www.google.com/calendar/render?action=TEMPLATE&text=Resepsi%20Hadi%20%26%20Puji&dates=${formatGCalDate(gCalResepsiStart)}/${formatGCalDate(gCalResepsiEnd)}&details=Resepsi%20Pernikahan%20Hadi%20%26%20Puji&location=Hotel%20Grand%20Tjokro,%20Bandung`;
  const gMapsLink = "https://goo.gl/maps/example";

  return (
    <section className="py-20 px-4 text-center bg-cover bg-fixed" style={{backgroundImage: `url(https://picsum.photos/seed/weddingbg/1200/800)`}}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 mx-auto max-w-4xl bg-[#F8F4F1] bg-opacity-90 p-8 rounded-xl shadow-2xl">
            <FlowerIcon className="w-16 h-16 mx-auto mb-6 text-[#C0A080]"/>
            <h2 className="font-dancing text-5xl mb-4">Save The Date</h2>
            <p className="max-w-2xl mx-auto mb-8">
                Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan memberikan doa restu pada hari pernikahan kami yang akan diselenggarakan pada:
            </p>
            <Countdown targetDate={weddingDate} />
            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="event-card p-6 border-2 border-[#C0A080] rounded-lg bg-white shadow-lg">
                    <h3 className="font-dancing text-4xl mb-4">Akad Nikah</h3>
                    <p className="font-bold">{displayDate}</p>
                    <p>09:00 - 10:00 WIB</p>
                    <p className="mt-2">Hotel Grand Tjokro, Bandung</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href={gCalLinkAkad} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 bg-[#C0A080] text-white rounded-full hover:bg-[#A98C70] transition-colors">
                            <CalendarIcon className="w-4 h-4" /> Save to Calendar
                        </a>
                        <a href={gMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                            <MapPinIcon className="w-4 h-4" /> View Location
                        </a>
                    </div>
                </div>
                <div className="event-card p-6 border-2 border-[#C0A080] rounded-lg bg-white shadow-lg">
                    <h3 className="font-dancing text-4xl mb-4">Resepsi</h3>
                    <p className="font-bold">{displayDate}</p>
                    <p>11:00 - 13:00 WIB</p>
                    <p className="mt-2">Hotel Grand Tjokro, Bandung</p>
                     <div className="flex justify-center gap-4 mt-4">
                        <a href={gCalLinkResepsi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 bg-[#C0A080] text-white rounded-full hover:bg-[#A98C70] transition-colors">
                            <CalendarIcon className="w-4 h-4" /> Save to Calendar
                        </a>
                        <a href={gMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                            <MapPinIcon className="w-4 h-4" /> View Location
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default EventSection;