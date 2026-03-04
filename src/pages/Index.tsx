import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, MapPin, Home, Landmark } from "lucide-react";
import { initialProperties, Property } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import FakeMap from "@/components/FakeMap";

const Index = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return properties;
    const q = searchQuery.toLowerCase();
    return properties.filter(
      (p) =>
        p.address.toLowerCase().includes(q) ||
        p.owner.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.zip.includes(q)
    );
  }, [searchQuery, properties]);

  const handlePropertyClick = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  const handlePinClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Official Government Navbar */}
      <nav className="sticky top-0 z-40 bg-primary border-b-4 border-[#C8102E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-xl font-bold text-primary-foreground uppercase tracking-wider leading-tight">
                CA County Assessor
              </span>
              <span className="text-[10px] sm:text-xs text-primary-foreground/80 font-medium uppercase tracking-widest">
                Official Property Records Database
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-bold text-primary-foreground uppercase tracking-widest">
            <button
              onClick={() =>
                document
                  .getElementById("map")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:underline transition-all"
            >
              Map View
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("properties")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:underline transition-all"
            >
              Property Search
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Official Banner */}
      <section className="relative py-12 sm:py-20 px-4 bg-muted border-b border-border shadow-inner">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-sm px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 border border-primary/20">
            <Shield className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
              Public Record Verification Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight uppercase tracking-tight">
            Property Ownership & Tax Assessment Registry
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            Search verified county property data, assessment valuations, and
            recorded ownership details for{" "}
            <span className="font-bold text-foreground">
              Hallwood Drive Region, El Monte, CA
            </span>
            .
          </p>

          {/* Search bar */}
          <div className="mt-8 sm:mt-10 max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Assessor's Parcel Number (APN), Address, or Owner Name..."
              className="w-full bg-card border-2 border-border focus:border-primary rounded-none pl-12 pr-6 py-4 sm:py-5 text-foreground shadow-sm outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        id="map"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Real Google Map */}
          <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] bg-card border-2 border-primary shadow-sm overflow-hidden flex flex-col">
            <div className="bg-primary px-3 py-2 border-b flex items-center justify-between">
              <span className="text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Regional Overview (El Monte, CA)
              </span>
              <span className="text-primary-foreground/70 text-[10px] uppercase font-mono tracking-tighter">
                Geo: 34.0686° N, 118.0275° W
              </span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7196307123497!2d-118.0275!3d34.0686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d0f0d2b1f833%3A0xc3c5f403ac3a8e93!2sEl%20Monte%2C%20CA!5e0!3m2!1sen!2sus!4v1709590820000!5m2!1sen!2sus"
              className="w-full flex-1 border-0 grayscale-[30%] contrast-125"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Fake Parcel Map */}
          <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] bg-card border-2 border-primary shadow-sm flex flex-col">
            <div className="bg-primary px-3 py-2 border-b flex items-center justify-between">
              <span className="text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Verified Parcel Layout
              </span>
              <span className="text-primary-foreground/70 text-[10px] uppercase font-mono tracking-tighter">
                Scale: 1:200
              </span>
            </div>
            <div className="flex-1 w-full relative overflow-hidden">
              <FakeMap
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onPinClick={handlePinClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Selected property quick view */}
      {selectedProperty && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            onClick={() => handlePropertyClick(selectedProperty)}
            className="bg-card border-2 border-primary border-l-4 p-3 sm:p-4 flex gap-3 sm:gap-4 items-center cursor-pointer hover:bg-muted/50 transition-colors shadow-sm"
          >
            <img
              src={selectedProperty.image}
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover flex-shrink-0 grayscale contrast-125"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-card-foreground text-sm sm:text-base uppercase tracking-wide truncate">
                {selectedProperty.address}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                {selectedProperty.city}, {selectedProperty.state}{" "}
                {selectedProperty.zip}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold uppercase bg-muted px-1 py-0.5 text-muted-foreground border">
                  APN: {selectedProperty.apn}
                </span>
                <p className="text-xs sm:text-sm text-secondary-foreground font-semibold truncate">
                  Owner: {selectedProperty.owner.name}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 hidden xs:block">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-0.5">
                Assessed Value
              </p>
              <p className="text-base sm:text-lg font-bold text-primary">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(selectedProperty.value)}
              </p>
              <p className="text-[10px] font-bold text-primary underline mt-1 uppercase tracking-wider">
                View Full Record →
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Properties grid */}
      <section
        id="properties"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <div className="flex items-center justify-between border-b-2 border-primary pb-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-display font-bold uppercase tracking-wide text-foreground">
              Property Registry Database
            </h2>
            <p className="text-muted-foreground font-medium text-xs sm:text-sm mt-1">
              {filteredProperties.length} records matched based on search
              parameters.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Total Records in County
            </span>
            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 shadow-sm">
              <Home className="w-4 h-4" />
              <span className="text-xs font-bold">
                {properties.length} Active Parcels
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={handlePropertyClick}
              isSelected={selectedProperty?.id === property.id}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No properties match your search
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try a different address or owner name
            </p>
          </div>
        )}
      </section>

      {/* Official Footer */}
      <footer className="border-t-4 border-primary bg-card py-6 sm:py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-2">
          <Shield className="w-8 h-8 text-muted-foreground/30" />
          <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 Office of the Assessor-County Clerk-Recorder.
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-muted-foreground/70 max-w-2xl mt-2">
            The data presented on this portal is obtained from recorded public
            documents. For official legal verification, certified copies of
            documentation must be requested directly from the county office.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
