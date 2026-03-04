import { useParams, useNavigate } from "react-router-dom";
import { initialProperties } from "@/data/properties";
import {
  MapPin,
  ArrowLeft,
  Building2,
  UserCircle2,
  Landmark,
  FileText,
  CalendarDays,
  Maximize,
  Bed,
  Bath,
} from "lucide-react";

const PropertyView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("PropertyView Route ID Param:", id);
  const property = initialProperties.find((p) => p.id === id);
  console.log("Found Property:", property);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">
          Property Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The requested property record could not be found in the database.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-primary text-primary-foreground font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Database
        </button>
      </div>
    );
  }

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-background">
      {/* Official Header */}
      <header className="bg-primary text-primary-foreground border-b-4 border-[#C8102E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Landmark className="w-8 h-8 sm:w-10 sm:h-10" />
            <div>
              <h1 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-wider">
                County Assessor Portal
              </h1>
              <p className="text-xs sm:text-sm text-primary-foreground/80 font-medium">
                Official Property Records Database
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="hidden sm:flex items-center gap-2 hover:underline text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> New Search
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Bar - Document Style */}
        <div className="border-b-2 border-primary mb-8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <span className="uppercase text-xs font-bold tracking-widest bg-muted px-2 py-1">
                Record ID: #{property.id.padStart(5, "0")}
              </span>
              <span className="text-xs font-medium">
                Last Updated: {property.lastSaleDate || "2023-11-04"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Parcel Data Report
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
              Status
            </p>
            <p className="text-sm font-bold text-success flex items-center sm:justify-end gap-1">
              <FileText className="w-4 h-4" /> ACTIVE RECORD
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Data Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Location Block */}
            <section className="bg-card border shadow-sm">
              <div className="bg-secondary/50 border-b px-6 py-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide">
                  Property Location
                </h3>
              </div>
              <div className="p-6">
                <p className="text-2xl font-bold text-foreground mb-1">
                  {property.address}
                </p>
                <p className="text-lg text-muted-foreground">
                  {property.city}, {property.state} {property.zip}
                </p>
              </div>
            </section>

            {/* Assessment & Valuation */}
            <section className="bg-card border shadow-sm">
              <div className="bg-secondary/50 border-b px-6 py-4 flex items-center gap-3">
                <Landmark className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide">
                  Assessment Information
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                    Assessed Value
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(property.value)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                    Last Sale Date
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    {property.lastSaleDate}
                  </p>
                </div>
                <div className="col-span-1 sm:col-span-2 border-t pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">
                      APN (Parcel Number)
                    </p>
                    <p className="text-sm font-mono text-foreground">
                      {property.apn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">
                      Zoning Code
                    </p>
                    <p className="text-sm font-mono text-foreground">
                      {property.zoning}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Structural Details */}
            <section className="bg-card border shadow-sm">
              <div className="bg-secondary/50 border-b px-6 py-4 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide">
                  Structural Characteristics
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Bed className="w-4 h-4" />{" "}
                      <span className="text-xs uppercase font-bold">
                        Bedrooms
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.bedrooms}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Bath className="w-4 h-4" />{" "}
                      <span className="text-xs uppercase font-bold">
                        Bathrooms
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.bathrooms}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Maximize className="w-4 h-4" />{" "}
                      <span className="text-xs uppercase font-bold">
                        Building Area
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.sqft.toLocaleString()}{" "}
                      <span className="text-sm font-normal">SqFt</span>
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Maximize className="w-4 h-4 opacity-50" />{" "}
                      <span className="text-xs uppercase font-bold">
                        Lot Area
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.lotSize?.toLocaleString() || "5,000"}{" "}
                      <span className="text-sm font-normal">SqFt</span>
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-4 border-t pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CalendarDays className="w-4 h-4" />{" "}
                      <span className="text-xs uppercase font-bold">
                        Year Built
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.yearBuilt}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Property Photo */}
            <div className="border bg-card shadow-sm p-2">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img
                  src={property.image}
                  alt="Property Snapshot"
                  className="w-full h-full object-cover grayscale-[20%] contrast-125"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] uppercase font-mono px-2 py-1">
                  IMG_REF_{property.id.padStart(4, "0")}
                </div>
              </div>
            </div>

            {/* Owner Info - strictly read-only */}
            <section className="bg-card border shadow-sm">
              <div className="bg-secondary/50 border-b px-4 py-3 flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-primary" />
                <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wide">
                  Recorded Ownership
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
                    Primary Owner Name(s)
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {property.owner.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
                      Marital Status
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {property.owner.maritalStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
                      Occupancy
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {property.owner.occupancy}
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 mt-4 border border-dashed text-xs text-muted-foreground">
                  <p className="font-bold mb-1 text-foreground">
                    Contact Information
                  </p>
                  <p>Phone: {property.owner.phone}</p>
                  <p>Email: {property.owner.email}</p>
                </div>
              </div>
            </section>

            <div className="text-xs text-muted-foreground text-center px-4">
              Data deemed reliable but not guaranteed. For official verification
              purposes, please contact the county clerk's office directly.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyView;
