export interface LatLng {
  lat: number;
  lng: number;
}

interface PinImg {
  publicUrl: string;
}

interface PinLocation {
  coordinates: number[];
  type: string;
  _id: string;
}

export interface Pin {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  img: PinImg;
  location: PinLocation;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  _id: string;
  amount: number;
  points: number;
  receipt: string;
  createdAt: string;
}

export interface User {
  username: string;
  points: number;
  invoices: Invoice[];
  pins: Pin[];
}

export interface PinFormData {
  title: string;
  description: string;
  lat: number | undefined;
  lng: number | undefined;
  startDate: string;
  duration: number;
  img: File | null;
}

export type Coords = [number, number];
