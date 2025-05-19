export interface WordSearchLevel {
  id: string;
  name: string;
  description: string;
  grid: string[][];
  words: string[];
  timeLimit?: number;
}

export interface WordPosition {
  word: string;
  found: boolean;
  positions: {
    row: number;
    col: number;
  }[];
}

export type Direction = 
  | "horizontal" 
  | "vertical" 
  | "diagonal-right-down" 
  | "diagonal-left-down"
  | "horizontal-reverse"
  | "vertical-reverse"
  | "diagonal-right-up"
  | "diagonal-left-up";

export interface WordSelection {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  word: string;
}
