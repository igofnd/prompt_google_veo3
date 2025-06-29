
import React, { useState } from 'react';
import { GiftIcon } from './icons/GiftIcon';
import { CopyIcon } from './icons/CopyIcon';

const GiftSection: React.FC = () => {
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <GiftIcon className="w-16 h-16 mx-auto mb-6 text-[#C0A080]" />
        <h2 className="font-dancing text-5xl mb-4">Wedding Gift</h2>
        <p className="mb-10 max-w-2xl mx-auto">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun, jika Anda ingin memberikan tanda kasih, kami dengan senang hati menerimanya dan itu akan menyempurnakan kebahagiaan kami.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="gift-card bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#C0A080]">
            <h3 className="font-bold text-xl mb-4 text-center">Transfer Bank</h3>
            <div className="space-y-4">
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA Logo" className="h-6 mb-2"/>
                <p>a.n. Hadi Wijaya</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-lg">1234567890</p>
                  <button onClick={() => handleCopy('1234567890', 'bca')} className="p-1 text-gray-500 hover:text-black">
                    {copiedText === 'bca' ? 'Copied!' : <CopyIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
               <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png" alt="Mandiri Logo" className="h-6 mb-2"/>
                <p>a.n. Puji Lestari</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-lg">0987654321</p>
                  <button onClick={() => handleCopy('0987654321', 'mandiri')} className="p-1 text-gray-500 hover:text-black">
                     {copiedText === 'mandiri' ? 'Copied!' : <CopyIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="gift-card bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#C0A080]">
            <h3 className="font-bold text-xl mb-4 text-center">Kirim Hadiah</h3>
            <p className="mb-2"><strong>Alamat:</strong></p>
            <p className="mb-4">Jl. Kebahagiaan No. 123, Komplek Cinta, Bandung, Jawa Barat, 40123</p>
             <button onClick={() => handleCopy('Jl. Kebahagiaan No. 123, Komplek Cinta, Bandung, Jawa Barat, 40123', 'address')} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              {copiedText === 'address' ? 'Alamat Disalin!' : 'Salin Alamat'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;