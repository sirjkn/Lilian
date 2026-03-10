import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoGalleryProps {
  photos: string[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) {
    return null;
  }

  const openGallery = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goToPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <>
      {/* Thumbnail Marquee */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -photos.length * 280],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: photos.length * 5,
              ease: 'linear',
            },
          }}
        >
          {[...photos, ...photos].map((photo, index) => (
            <div
              key={`${photo}-${index}`}
              className="flex-shrink-0 w-64 h-48 cursor-pointer rounded-lg overflow-hidden"
              onClick={() => openGallery(index % photos.length)}
            >
              <img
                src={photo}
                alt={`Gallery photo ${(index % photos.length) + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Full Screen Slider */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeGallery}
          >
            {/* Blurred Background */}
            <div
              className="absolute inset-0 backdrop-blur-xl"
              style={{
                backgroundImage: `url(${photos[selectedIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px) brightness(0.5)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                <X className="w-8 h-8 text-white" />
              </button>

              {/* Previous Button */}
              {photos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
              )}

              {/* Image */}
              <motion.img
                key={selectedIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={photos[selectedIndex]}
                alt={`Gallery photo ${selectedIndex + 1}`}
                className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next Button */}
              {photos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white">
                {selectedIndex + 1} / {photos.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
