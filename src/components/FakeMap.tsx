import { Property } from "@/data/properties";
import mapBg from "@/assets/map-bg.jpg";
import { MapPin } from "lucide-react";

interface FakeMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPinClick: (property: Property) => void;
}

const FakeMap = ({
  properties,
  selectedProperty,
  onPinClick,
}: FakeMapProps) => {
  return (
    <div className="relative w-full h-full bg-muted">
      {/* Map background */}
      <img src={mapBg} alt="Map" className="w-full h-full object-cover" />

      {/* Map UI overlays */}
      <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-md flex items-center gap-2">
        <span className="text-[10px] sm:text-xs font-semibold text-card-foreground">
          Current Location: United States
        </span>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        <button className="w-7 h-7 sm:w-8 sm:h-8 bg-card/90 backdrop-blur-sm rounded shadow-md flex items-center justify-center text-card-foreground font-bold text-base sm:text-lg hover:bg-card transition-colors">
          +
        </button>
        <button className="w-7 h-7 sm:w-8 sm:h-8 bg-card/90 backdrop-blur-sm rounded shadow-md flex items-center justify-center text-card-foreground font-bold text-base sm:text-lg hover:bg-card transition-colors">
          −
        </button>
      </div>

      {/* Google branding */}
      <div className="absolute bottom-3 left-3 bg-card/80 backdrop-blur-sm rounded px-2 py-1">
        <span className="text-[10px] text-muted-foreground">
          Map data ©2026 Google
        </span>
      </div>

      {/* Scale bar */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1">
        <div className="w-12 sm:w-16 h-0.5 bg-card-foreground/50" />
        <span className="text-[10px] text-card-foreground/70 bg-card/60 px-1 rounded">
          200 ft
        </span>
      </div>

      {/* Map pins */}
      {properties.map((property) => (
        <button
          key={property.id}
          onClick={() => onPinClick(property)}
          className={`absolute transition-all duration-200 -translate-x-1/2 -translate-y-full ${
            selectedProperty?.id === property.id
              ? "z-20 scale-125"
              : "z-10 hover:scale-110"
          }`}
          style={{
            top: property.mapPosition.top,
            left: property.mapPosition.left,
          }}
          title={property.address}
        >
          <div className="relative">
            <MapPin
              className={`w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg ${
                selectedProperty?.id === property.id
                  ? "text-accent"
                  : "text-map-pin"
              }`}
              fill={
                selectedProperty?.id === property.id
                  ? "hsl(var(--accent))"
                  : "hsl(var(--map-pin))"
              }
            />
            {selectedProperty?.id === property.id && (
              <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-card rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg whitespace-nowrap border">
                <p className="text-[10px] sm:text-xs font-semibold text-card-foreground">
                  {property.address}
                </p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                  {property.owner.name}
                </p>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default FakeMap;
