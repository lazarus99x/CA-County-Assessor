import { Property } from "@/data/properties";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
  isSelected: boolean;
}

const PropertyCard = ({ property, onClick, isSelected }: PropertyCardProps) => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div
      onClick={() => onClick(property)}
      className={`group cursor-pointer bg-card border transition-all duration-200 hover:bg-muted/30 ${
        isSelected
          ? "border-primary border-2 shadow-sm"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="relative h-48 overflow-hidden border-b">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover grayscale-[30%] contrast-125"
        />
        <div className="absolute top-0 right-0 bg-primary px-3 py-1.5 shadow-sm">
          <span className="text-primary-foreground font-bold font-mono tracking-tight text-sm">
            {formatPrice(property.value)}
          </span>
        </div>
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5">
          <span className="text-white text-[10px] uppercase font-bold tracking-widest">
            APN: {property.apn}
          </span>
        </div>
      </div>
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
