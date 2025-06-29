
import React from 'react';
import { RingIcon } from './icons/RingIcon';

const InvitationSection: React.FC = () => {
  return (
    <section className="py-20 px-4 text-center bg-white shadow-lg my-10 mx-4 md:mx-auto max-w-4xl rounded-lg">
      <RingIcon className="w-16 h-16 mx-auto mb-6 text-[#C0A080]" />
      <p className="text-sm md:text-base italic max-w-2xl mx-auto mb-6">
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
      </p>
      <p className="text-sm md:text-base font-bold mb-8">(QS. Ar-Rum: 21)</p>
      <p className="mb-4">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
      <p className="max-w-3xl mx-auto mb-8">
        Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        <div className="groom">
          <h2 className="font-dancing text-5xl text-[#C0A080] mb-2">Hadi</h2>
          <p className="font-bold text-lg">Hadi Wijaya, S.Kom</p>
          <p className="text-sm">Putra dari Bapak Fulan & Ibu Fulanah</p>
        </div>
        <div className="font-dancing text-6xl text-[#C0A080]">&</div>
        <div className="bride">
          <h2 className="font-dancing text-5xl text-[#C0A080] mb-2">Puji</h2>
          <p className="font-bold text-lg">Puji Lestari, S.E.</p>
          <p className="text-sm">Putri dari Bapak Fulan & Ibu Fulanah</p>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;