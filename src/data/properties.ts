import house1 from "@/assets/house-1.jpg";
import house2 from "@/assets/house-2.jpg";
import house3 from "@/assets/house-3.jpg";
import house4 from "@/assets/house-4.jpg";
import house5 from "@/assets/house-5.jpg";
import house6 from "@/assets/house-6.jpg";
import house7 from "@/assets/house-7.jpg";
import house8 from "@/assets/house-8.jpg";
import house9 from "@/assets/house-9.jpg";
import house10 from "@/assets/house-10.jpg";

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
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
  owner: Owner;
  mapPosition: { top: string; left: string };
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
    id: "1",
    address: "12048 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 1500000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house1,
    owner: {
      name: "Dr Benson Jackson",
      maritalStatus: "Widower",
      phone: "(626) 555-0142",
      email: "b.jackson@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "35%", left: "42%" },
  },
  {
    id: "2",
    address: "12064 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 1000000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house2,
    owner: {
      name: "Maria Gonzalez",
      maritalStatus: "Married",
      phone: "(626) 555-0198",
      email: "m.gonzalez@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "30%", left: "55%" },
  },
  {
    id: "3",
    address: "12080 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 500000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house3,
    owner: {
      name: "James Liu",
      maritalStatus: "Single",
      phone: "(626) 555-0231",
      email: "j.liu@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "45%", left: "30%" },
  },
  {
    id: "4",
    address: "12096 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 1500000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house4,
    owner: {
      name: "Robert Chen",
      maritalStatus: "Married",
      phone: "(626) 555-0177",
      email: "r.chen@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "55%", left: "60%" },
  },
  {
    id: "5",
    address: "12112 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 750000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house5,
    owner: {
      name: "Susan Park",
      maritalStatus: "Divorced",
      phone: "(626) 555-0264",
      email: "s.park@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "40%", left: "72%" },
  },
  {
    id: "6",
    address: "12128 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 920000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1950,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house6,
    owner: {
      name: "Angela Torres",
      maritalStatus: "Married",
      phone: "(626) 555-0311",
      email: "a.torres@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "25%", left: "38%" },
  },
  {
    id: "7",
    address: "12144 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 1850000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3600,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house7,
    owner: {
      name: "David & Karen Mitchell",
      maritalStatus: "Married",
      phone: "(626) 555-0387",
      email: "d.mitchell@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "50%", left: "48%" },
  },
  {
    id: "8",
    address: "12160 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 680000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1650,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house8,
    owner: {
      name: "Thomas Nguyen",
      maritalStatus: "Single",
      phone: "(626) 555-0425",
      email: "t.nguyen@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "60%", left: "35%" },
  },
  {
    id: "9",
    address: "12176 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 2200000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4200,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house9,
    owner: {
      name: "Dr. Priya Sharma",
      maritalStatus: "Married",
      phone: "(626) 555-0468",
      email: "p.sharma@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "32%", left: "65%" },
  },
  {
    id: "10",
    address: "12192 Hallwood Dr",
    city: "El Monte",
    state: "CA",
    zip: "91732",
    value: 1150000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    lotSize: 5000,
    yearBuilt: 1980,
    apn: '8472-019-03' + Math.floor(Math.random() * 9),
    zoning: 'R-1 Single Family',
    lastSaleDate: '2021-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 27) + 1).padStart(2, '0'),
    image: house10,
    owner: {
      name: "William & Sarah Foster",
      maritalStatus: "Married",
      phone: "(626) 555-0512",
      email: "w.foster@email.com",
      occupancy: "Primary Resident",
    },
    mapPosition: { top: "48%", left: "78%" },
  },
];
