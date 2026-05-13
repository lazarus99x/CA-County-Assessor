import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  ShieldCheck,
} from "lucide-react";

const PropertyView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = initialProperties.find((record) => record.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const images =
    property?.gallery && property.gallery.length > 0
      ? property.gallery
      : property
        ? [property.image]
        : [];

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevPhoto = () =>
    setLightboxIdx((index) => (index - 1 + images.length) % images.length);
  const nextPhoto = () =>
    setLightboxIdx((index) => (index + 1) % images.length);

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="mb-4 font-display text-3xl font-bold text-foreground">
          Property Not Found
        </h1>
        <p className="mb-8 text-muted-foreground">
          The requested property record could not be found in the directory.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-primary px-6 py-2 font-medium text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Directory
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

  const mainImage = images[0];
  const thumbs = images.slice(1, 4);
  const extraCount = images.length - 4;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Landmark className="h-8 w-8 sm:h-10 sm:w-10" />
            <div>
              <h1 className="font-display text-lg font-bold uppercase tracking-wider sm:text-2xl">
                Michigan State Property Directory
              </h1>
              <p className="text-xs font-medium text-primary-foreground/80 sm:text-sm">
                Independent Residential Record View
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="hidden items-center gap-2 text-sm font-medium hover:underline sm:flex"
          >
            <ArrowLeft className="h-4 w-4" /> New Search
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b-2 border-primary pb-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <span className="bg-muted px-2 py-1 text-xs font-bold uppercase tracking-widest">
                Record ID: {property.id}
              </span>
              <span className="text-xs font-medium">
                Last Updated: {property.lastSaleDate}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Residential property file
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
              {property.bedrooms} bd • {property.bathrooms} ba •{" "}
              {property.sqft.toLocaleString()} sq ft
            </p>
            <p className="mt-1 text-sm text-foreground sm:text-base">
              {property.address}, {property.city}, {property.state}{" "}
              {property.zip}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <p className="flex items-center gap-1 text-sm font-bold text-success sm:justify-end">
              <FileText className="h-4 w-4" /> {property.status.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="mb-8 border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>{property.recordDisclaimer}</p>
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Property Photos - {images.length} images on file
            </span>
          </div>

          <div className="grid h-64 grid-cols-4 grid-rows-2 gap-2 sm:h-96">
            <div
              className="group relative col-span-4 row-span-2 cursor-pointer overflow-hidden bg-muted sm:col-span-2"
              onClick={() => openLightbox(0)}
            >
              <img
                src={mainImage}
                alt="Front view"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[10px] uppercase text-white">
                Front View
              </div>
            </div>

            {thumbs.map((src, index) => (
              <div
                key={src}
                className="group relative col-span-2 cursor-pointer overflow-hidden bg-muted sm:col-span-1"
                onClick={() => openLightbox(index + 1)}
              >
                <img
                  src={src}
                  alt={`View ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 text-[9px] uppercase text-white">
                  View {index + 1}
                </div>
                {index === thumbs.length - 1 && extraCount > 0 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/55"
                    onClick={(event) => {
                      event.stopPropagation();
                      openLightbox(index + 1);
                    }}
                  >
                    <span className="text-2xl font-bold text-white">
                      +{extraCount}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {thumbs.length === 0 && (
              <div className="col-span-2 row-span-2 flex items-center justify-center bg-muted text-xs text-muted-foreground sm:col-span-2">
                No additional photos
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b bg-secondary/50 px-6 py-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Property Location
                </h3>
              </div>
              <div className="p-6">
                <p className="mb-1 text-2xl font-bold text-foreground">
                  {property.address}
                </p>
                <p className="text-lg text-muted-foreground">
                  {property.city}, {property.state} {property.zip}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {property.county}
                </p>
              </div>
            </section>

            <section className="border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b bg-secondary/50 px-6 py-4">
                <Landmark className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Valuation and parcel information
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Directory Estimate
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(property.value)}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Last Sale Date
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    {property.lastSaleDate}
                  </p>
                </div>
                <div className="col-span-1 grid grid-cols-2 gap-4 border-t pt-4 sm:col-span-2">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                      APN (Parcel Number)
                    </p>
                    <p className="text-sm font-mono text-foreground">
                      {property.apn}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                      Zoning Code
                    </p>
                    <p className="text-sm font-mono text-foreground">
                      {property.zoning}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b bg-secondary/50 px-6 py-4">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Structural characteristics
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <Bed className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
                        Bedrooms
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.bedrooms}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <Bath className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
                        Bathrooms
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.bathrooms}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <Maximize className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
                        Building Area
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.sqft.toLocaleString()}{" "}
                      <span className="text-sm font-normal">Sq Ft</span>
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <Maximize className="h-4 w-4 opacity-50" />
                      <span className="text-xs font-bold uppercase">
                        Lot Area
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {property.lotSize.toLocaleString()}{" "}
                      <span className="text-sm font-normal">Sq Ft</span>
                    </p>
                  </div>
                  <div className="col-span-2 border-t pt-4 sm:col-span-4">
                    <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
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

            <section className="border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b bg-secondary/50 px-6 py-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Property overview
                </h3>
              </div>
              <div className="space-y-5 p-6">
                <p className="leading-7 text-foreground/90">
                  {property.description}
                </p>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Key property notes
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {property.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="border-l-4 border-primary bg-muted/40 px-4 py-3 text-sm text-foreground/90"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b bg-secondary/50 px-6 py-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Map location
                </h3>
              </div>
              <div className="p-4">
                <iframe
                  src={property.mapEmbedUrl}
                  title="Property location"
                  className="h-[340px] w-full border"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b bg-secondary/50 px-4 py-3">
                <UserCircle2 className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  Public preview details
                </h3>
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p className="mb-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    Ownership display
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {property.owner.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                      Marital Status
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {property.owner.maritalStatus}
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                      Occupancy
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {property.owner.occupancy}
                    </p>
                  </div>
                </div>
                <div className="mt-4 border border-dashed bg-muted/50 p-3 text-xs text-muted-foreground">
                  <p className="mb-1 font-bold text-foreground">
                    Contact information
                  </p>
                  <p>Phone: {property.owner.phone}</p>
                  <p>Email: {property.owner.email}</p>
                </div>
              </div>
            </section>

            <div className="px-4 text-center text-xs text-muted-foreground">
              Data is presented in a directory format for browsing and design
              purposes. Verify current title, tax, and permitting data with the
              appropriate public office before relying on it.
            </div>
          </div>
        </div>
      </main>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/80 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="absolute left-4 top-4 bg-black/50 px-3 py-1 font-mono text-sm font-bold text-white/70">
            {lightboxIdx + 1} / {images.length}
          </div>

          <div
            className="relative flex max-h-[80vh] w-full max-w-5xl items-center justify-center px-14"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[lightboxIdx]}
              alt={`Property photo ${lightboxIdx + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/90 sm:left-6 sm:p-3"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/90 sm:right-6 sm:p-3"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div
            className="absolute bottom-4 flex max-w-full gap-2 overflow-x-auto px-4"
            onClick={(event) => event.stopPropagation()}
          >
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setLightboxIdx(index)}
                className={`h-10 w-14 flex-shrink-0 overflow-hidden border-2 transition-all sm:h-12 sm:w-16 ${
                  index === lightboxIdx
                    ? "border-white opacity-100"
                    : "border-white/30 opacity-50 hover:opacity-80"
                }`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyView;
