// src/constants/unitOptions.ts (or adjust the path as per your project structure)

export interface Option {
  id: number;
  name: string;
}

export const UNIT_OPTIONS: Option[] = [
  { id: 1, name: "Kg" },
  { id: 2, name: "Gram" },
  { id: 3, name: "Litre" },
  { id: 4, name: "Millilitre" },
  { id: 5, name: "Pcs" },
  { id: 6, name: "Dozen" },
  { id: 7, name: "Meter" },
  { id: 8, name: "Centimeter" },
  { id: 9, name: "Inch" },
  { id: 10, name: "Packet" },
  { id: 11, name: "Box" },
  { id: 12, name: "Roll" },
  { id: 13, name: "Bag" },
  { id: 14, name: "Bottle" },
  { id: 15, name: "Can" },
];
