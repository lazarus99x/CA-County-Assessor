import { useState, useEffect } from "react";
import { Property } from "@/data/properties";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
  isSelected: boolean;
}

const PropertyCard = ({ property, onClick, isSelected }: PropertyCardProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const images =
    property.gallery && property.gallery.length > 0
      ? property.gallery
      : [property.image];

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((i) => (i + 1) % images.length);
  };

  return (
    <div
      onClick={() => onClick(property)}
      className={`group cursor-pointer bg-card border transition-all duration-200 hover:bg-muted/30 ${
        isSelected
          ? "border-primary border-2 shadow-sm"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Image Slider */}
      <div className="relative h-48 overflow-hidden border-b">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={property.address}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              idx === currentIdx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Price tag */}
        <div className="absolute top-0 right-0 bg-primary px-3 py-1.5 shadow-sm z-10">
          <span className="text-primary-foreground font-bold font-mono tracking-tight text-sm">
            {formatPrice(property.value)}
          </span>
        </div>

        {/* APN tag */}
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 z-10">
          <span className="text-white text-[10px] uppercase font-bold tracking-widest">
            APN: {property.apn}
          </span>
        </div>

        {/* Navigation arrows — only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIdx(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentIdx ? "bg-white w-3" : "bg-white/50"
                  }`}
                  aria-label={`Photo ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold text-card-foreground uppercase tracking-wide truncate">
          {property.address}
        </h3>
        <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-xs font-medium uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>
            {property.city}, {property.state} {property.zip}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-muted-foreground text-xs font-medium uppercase tracking-wider">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] opacity-70">Beds</span>
            <span className="flex items-center gap-1 text-foreground font-bold">
              <Bed className="w-3.5 h-3.5" /> {property.bedrooms}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] opacity-70">Baths</span>
            <span className="flex items-center gap-1 text-foreground font-bold">
              <Bath className="w-3.5 h-3.5" /> {property.bathrooms}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] opacity-70">SqFt</span>
            <span className="flex items-center gap-1 text-foreground font-bold">
              <Maximize className="w-3.5 h-3.5" />{" "}
              {property.sqft.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t bg-muted/20 -mx-4 -mb-4 px-4 py-3">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Primary Owner
          </p>
          <p className="text-sm font-bold text-card-foreground truncate">
            {property.owner.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
