export interface Hotel {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  country: string;
  distance?: {
    value: number;
    unit: string;
  };
}