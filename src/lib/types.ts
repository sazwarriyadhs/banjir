export type FloodStatusLevel = 'Siaga 1' | 'Siaga 2' | 'Siaga 3' | 'Siaga 4' | 'Aman';

export type CityFloodStatus = {
  city: string;
  status: FloodStatusLevel;
};

export type UserFloodReport = {
  id: string;
  location: string;
  description: string;
  imageUrl?: string;
  time: string; // ISO string
  latitude: number;
  longitude: number;
};
