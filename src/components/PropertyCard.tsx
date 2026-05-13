import { type MouseEvent, useEffect, useState } from "react";
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

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((index) => (index + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goPrev = (event: MouseEvent) => {
    event.stopPropagation();
    setCurrentIdx((index) => (index - 1 + images.length) % images.length);
  };

  const goNext = (event: MouseEvent) => {
    event.stopPropagation();
    setCurrentIdx((index) => (index + 1) % images.length);
  };

  return (
    <div
      onClick={() => onClick(property)}
      className={`group cursor-pointer border bg-card transition-all duration-200 hover:bg-muted/30 ${
        isSelected
          ? "border-2 border-primary shadow-sm"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="relative h-48 overflow-hidden border-b">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={property.address}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === currentIdx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute right-0 top-0 z-10 bg-primary px-3 py-1.5 shadow-sm">
          <span className="font-mono text-sm font-bold tracking-tight text-primary-foreground">
            {formatPrice(property.value)}
          </span>
        </div>

        <div className="absolute left-2 top-2 z-10 bg-black/70 px-2 py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">
            APN: {property.apn}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-1.5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-colors hover:bg-black/80 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-colors hover:bg-black/80 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentIdx(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIdx ? "w-3 bg-white" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="truncate font-display text-lg font-bold uppercase tracking-wide text-card-foreground">
          {property.address}
        </h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>
            {property.city}, {property.state} {property.zip}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] opacity-70">Beds</span>
            <span className="flex items-center gap-1 font-bold text-foreground">
              <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] opacity-70">Baths</span>
            <span className="flex items-center gap-1 font-bold text-foreground">
              <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] opacity-70">Sq Ft</span>
            <span className="flex items-center gap-1 font-bold text-foreground">
              <Maximize className="h-3.5 w-3.5" />
              {property.sqft.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="-mx-4 -mb-4 mt-4 border-t bg-muted/20 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Record note
          </p>
          <p className="truncate text-sm font-bold text-card-foreground">
            {property.county}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
