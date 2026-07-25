import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, Landmark, Filter, FileCheck2 } from "lucide-react";
import { initialProperties, Property } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

const Index = () => {
  const navigate = useNavigate();
  const [properties] = useState<Property[]>(initialProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    initialProperties[0] ?? null
  );

  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return properties;
    const q = searchQuery.toLowerCase();
    return properties.filter(
      (property) =>
        property.address.toLowerCase().includes(q) ||
        property.city.toLowerCase().includes(q) ||
        property.county.toLowerCase().includes(q) ||
        property.zip.includes(q) ||
        property.apn.toLowerCase().includes(q)
    );
  }, [properties, searchQuery]);

  const handlePropertyClick = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-40 border-b border-primary/20 bg-primary shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Landmark className="h-8 w-8 text-primary-foreground sm:h-10 sm:w-10" />
            <div className="flex flex-col">
              <span className="font-display text-base font-bold uppercase tracking-wider leading-tight text-primary-foreground sm:text-xl">
                Massachusetts State Property Directory
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-primary-foreground/80 sm:text-xs">
                Independent Residential Reference Index
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm font-bold uppercase tracking-widest text-primary-foreground sm:flex">
            <button
              onClick={() =>
                document
                  .getElementById("map")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="transition-all hover:underline"
            >
              Map View
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("properties")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="transition-all hover:underline"
            >
              Property Search
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-border bg-muted px-4 py-12 sm:py-20">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(90deg,transparent_0,transparent_24px,rgba(14,43,84,0.05)_24px,rgba(14,43,84,0.05)_25px),linear-gradient(transparent_0,transparent_24px,rgba(14,43,84,0.05)_24px,rgba(14,43,84,0.05)_25px)] [background-size:25px_25px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 border border-primary/15 bg-primary/10 px-3 py-1.5 text-primary">
            <Shield className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest sm:text-sm">
              Public-facing directory experience
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Massachusetts residential property lookup
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-muted-foreground sm:mt-6 sm:text-lg">
            Search a civic-styled property directory with parcel-style detail
            pages, mapping context, and image records for residential listings
            in Massachusetts.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (filteredProperties.length === 1) {
                navigate(`/property/${filteredProperties[0].id}`);
              } else if (filteredProperties.length > 0) {
                document
                  .getElementById("properties")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:mt-10 sm:flex-row"
          >
            <div className="group relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by address, parcel number, city, or county..."
                className="h-full w-full border-2 border-border bg-card py-4 pl-12 pr-6 text-sm font-medium text-foreground shadow-sm outline-none transition-all focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 border-2 border-primary bg-primary px-6 py-4 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:py-5"
            >
              <Filter className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Search Directory
              </span>
            </button>
          </form>
        </div>
      </section>

      <section
        id="map"
        className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 sm:-mt-8 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="relative flex h-[280px] w-full flex-col overflow-hidden border-2 border-primary bg-card shadow-sm sm:h-[400px] lg:h-[500px]">
            <div className="flex items-center justify-between border-b bg-primary px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground sm:text-xs">
                Statewide map context
              </span>
              <span className="text-[10px] font-mono uppercase tracking-tighter text-primary-foreground/70">
                Massachusetts overview
              </span>
            </div>
            <iframe
              src="https://maps.google.com/maps?q=Massachusetts&t=&z=6&ie=UTF8&iwloc=&output=embed"
              className="w-full flex-1 border-0 grayscale-[25%] contrast-125"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Massachusetts map overview"
            />
          </div>

          <div className="relative flex h-[280px] w-full flex-col overflow-hidden border-2 border-primary bg-card shadow-sm sm:h-[400px] lg:h-[500px]">
            <div className="flex items-center justify-between border-b bg-primary px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground sm:text-xs">
                Featured parcel location
              </span>
              <span className="text-[10px] font-mono uppercase tracking-tighter text-primary-foreground/70">
                Van Buren Township
              </span>
            </div>
            <iframe
              src={initialProperties[0].mapEmbedUrl}
              className="w-full flex-1 border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Featured Massachusetts property location"
            />
          </div>
        </div>
      </section>

      {selectedProperty && (
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => handlePropertyClick(selectedProperty)}
            className="flex cursor-pointer items-center gap-3 border-l-4 border-primary bg-card p-3 shadow-sm transition-colors hover:bg-muted/50 sm:gap-4 sm:p-4"
          >
            <img
              src={selectedProperty.image}
              alt={selectedProperty.address}
              className="h-16 w-16 flex-shrink-0 object-cover contrast-125 sm:h-20 sm:w-20"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-sm font-bold uppercase tracking-wide text-card-foreground sm:text-base">
                {selectedProperty.address}, {selectedProperty.city}
              </h3>
              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                {selectedProperty.city}, {selectedProperty.state}{" "}
                {selectedProperty.zip}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="border bg-muted px-1 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                  APN: {selectedProperty.apn}
                </span>
                <p className="truncate text-xs font-semibold text-secondary-foreground sm:text-sm">
                  County: {selectedProperty.county}
                </p>
              </div>
            </div>
            <div className="hidden flex-shrink-0 text-right sm:block">
              <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Directory Estimate
              </p>
              <p className="text-base font-bold text-primary sm:text-lg">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(selectedProperty.value)}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary underline">
                View Full Record
              </p>
            </div>
          </div>
        </div>
      )}

      <section
        id="properties"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mb-6 flex items-center justify-between border-b-2 border-primary pb-4 sm:mb-8">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              Property directory records
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Featured Massachusetts residential entry prepared in a neutral
              public-directory format.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={(record) => {
                setSelectedProperty(record);
                handlePropertyClick(record);
              }}
              isSelected={selectedProperty?.id === property.id}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="py-16 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground">
              No properties match your search
            </p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Try a different address, parcel number, or city name
            </p>
          </div>
        )}
      </section>

      <footer className="mt-12 border-t-4 border-primary bg-card py-6 sm:py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center sm:px-6 lg:px-8">
          <Shield className="h-8 w-8 text-muted-foreground/30" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground sm:text-sm">
            Copyright 2026 Massachusetts State Property Directory
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
