const propertyGallery = Array.from(
  { length: 35 },
  (_, index) => `/houseimagetr/${index + 1}.jpeg`
);

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  value: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  apn: string;
  zoning: string;
  lastSaleDate: string;
  image: string;
  gallery: string[];
  owner: Owner;
  status: string;
  description: string;
  highlights: string[];
  mapEmbedUrl: string;
  recordDisclaimer: string;
}

export interface Owner {
  name: string;
  maritalStatus: string;
  phone: string;
  email: string;
  occupancy: string;
}

export const initialProperties: Property[] = [
  {
    id: "MSPD-48111-001",
    address: "42183 Kouza Ct",
    city: "Van Buren Township",
    state: "MI",
    zip: "48111",
    county: "Wayne County",
    value: 1649000,
    bedrooms: 5,
    bathrooms: 8.5,
    sqft: 9877,
    lotSize: 30492,
    yearBuilt: 2007,
    apn: "83-064-99-0012-701",
    zoning: "R-1 Residential Estate",
    lastSaleDate: "2025-11-18",
    image: propertyGallery[0],
    gallery: propertyGallery,
    owner: {
      name: "Ownership details withheld from public preview",
      maritalStatus: "Not shown",
      phone: "Not displayed",
      email: "Not displayed",
      occupancy: "Residential use",
    },
    status: "Active directory record",
    description:
      "Positioned along all-sports Belleville Lake on a quiet cul-de-sac, this substantial waterfront residence presents a well-appointed residential footprint with expansive interior volume, large-scale entertaining areas, and broad lake-facing exposures. The property is suited to buyers or researchers reviewing premium shoreline housing stock in Van Buren Township, with a layout that supports private living quarters, guest accommodation, and recreational use.",
    highlights: [
      "Waterfront setting on Belleville Lake with cul-de-sac placement",
      "Approximate gross living area of 9,877 square feet",
      "Five-bedroom layout with eight full and one half bathrooms",
      "Large-format rooms suited for gathering, hosting, and multigenerational use",
      "Wayne County location with access to regional commuter corridors and recreation",
    ],
    mapEmbedUrl:
      "https://maps.google.com/maps?q=42183%20Kouza%20Ct%2C%20Van%20Buren%20Township%2C%20MI%2048111&t=&z=16&ie=UTF8&iwloc=&output=embed",
    recordDisclaimer:
      "This independent directory page is for informational reference only and should not be treated as an official state, county, or township record.",
  },
];
