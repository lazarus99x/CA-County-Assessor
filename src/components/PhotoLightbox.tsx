import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PhotoLightbox = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 rounded-full p-2 transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm font-mono font-bold bg-black/50 px-3 py-1">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Property photo ${currentIndex + 1}`}
          className="max-h-[85vh] max-w-full object-contain shadow-2xl"
        />
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 rounded-full p-2 sm:p-3 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 rounded-full p-2 sm:p-3 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-4 flex gap-2 overflow-x-auto max-w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              // will use onNext/onPrev cascade — parent controls index
              const diff = idx - currentIndex;
              if (diff > 0) for (let i = 0; i < diff; i++) onNext();
              else for (let i = 0; i < Math.abs(diff); i++) onPrev();
            }}
            className={`flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 border-2 overflow-hidden transition-all ${
              idx === currentIndex
                ? "border-white opacity-100"
                : "border-white/30 opacity-50 hover:opacity-80"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoLightbox;
