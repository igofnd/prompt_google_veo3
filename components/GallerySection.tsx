
import React from 'react';

const galleryImages = [
  'https://picsum.photos/seed/gallery1/500/700',
  'https://picsum.photos/seed/gallery2/500/700',
  'https://picsum.photos/seed/gallery3/500/700',
  'https://picsum.photos/seed/gallery4/500/700',
  'https://picsum.photos/seed/gallery5/500/700',
  'https://picsum.photos/seed/gallery6/500/700',
];

const GallerySection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="font-dancing text-5xl mb-4">Our Moments</h2>
        <p className="mb-12">Momen-momen bahagia yang terabadikan dalam sebuah bingkai cerita.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
