export interface GameLevel {
  id: string;
  name: string;
  originalImage: string;
  modifiedImage: string;
  differences: Difference[];
  description: string;
}

export interface Difference {
  x: number;
  y: number;
  radius: number;
  found: boolean;
}
