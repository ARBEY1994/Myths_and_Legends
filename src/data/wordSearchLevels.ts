import { WordSearchLevel } from "@/types/wordSearch";

export const WORD_SEARCH_LEVELS: WordSearchLevel[] = [
  {
    id: "level1",
    name: "Leyendas Colombianas",
    description:
      "Encuentra personajes de leyendas colombianas en esta sopa de letras",
    grid: [
      ["L", "L", "O", "R", "O", "N", "A", "I", "O", "E"],
      ["A", "L", "O", "S", "A", "T", "A", "P", "T", "Z"],
      ["X", "C", "V", "B", "N", "M", "Q", "N", "E", "R"],
      ["T", "Y", "U", "I", "O", "P", "O", "S", "D", "F"],
      ["G", "H", "J", "K", "L", "M", "X", "C", "V", "B"],
      ["N", "M", "Q", "W", "E", "R", "T", "Y", "U", "I"],
      ["O", "P", "A", "R", "D", "F", "G", "H", "J", "K"],
      ["L", "Z", "D", "C", "V", "B", "N", "M", "Q", "W"],
      ["E", "A", "T", "Y", "U", "I", "O", "P", "A", "S"],
      ["M", "F", "G", "H", "A", "N", "A", "H", "O", "M"],
    ],
    words: ["MOHANA", "LLORONA", "MADREMONTE", "PATASOLA"],
    timeLimit: 120,
  },
  {
    id: "level2",
    name: "Criaturas Míticas",
    description: "Descubre criaturas míticas de todo el mundo",
    grid: [
      ["X", "I", "N", "E", "F", "N", "P", "Q", "R", "S"],
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      ["N", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
      ["U", "N", "I", "C", "O", "R", "N", "I", "O", "V"],
      ["R", "O", "Y", "Z", "A", "B", "C", "D", "E", "F"],
      ["I", "G", "I", "J", "K", "L", "M", "N", "O", "P"],
      ["S", "A", "R", "F", "O", "F", "I", "R", "G", "U"],
      ["R", "R", "X", "Y", "Z", "A", "B", "C", "D", "E"],
      ["G", "D", "H", "I", "J", "K", "L", "M", "N", "O"],
      ["A", "N", "O", "G", "A", "R", "D", "Q", "R", "S"],
    ],
    words: ["DRAGON", "UNICORNIO", "FENIX", "SIRENA", "GRIFO"],
    timeLimit: 150,
  },
  {
    id: "level3",
    name: "Dioses Antiguos",
    description: "Encuentra nombres de dioses de diferentes culturas",
    grid: [
      ["Z", "E", "U", "S", "A", "B", "C", "D", "E", "F"],
      ["G", "H", "I", "J", "K", "L", "M", "N", "O", "P"],
      ["Q", "R", "S", "I", "U", "V", "W", "X", "Y", "I"],
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "S"],
      ["K", "L", "M", "N", "I", "D", "O", "N", "P", "I"],
      ["R", "A", "S", "T", "U", "V", "W", "X", "Y", "S"],
      ["A", "N", "U", "B", "I", "S", "C", "D", "E", "F"],
      ["G", "H", "I", "J", "K", "L", "M", "N", "O", "P"],
      ["Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      ["R", "O", "H", "T", "A", "R", "C", "D", "E", "F"],
    ],
    words: ["ZEUS", "ODIN", "ANUBIS", "THOR", "RA", "ISIS"],
    timeLimit: 180,
  },
];

// Función para generar una sopa de letras aleatoria
export function generateRandomWordSearch(
  words: string[],
  size: number = 10
): string[][] {
  // Crear una matriz vacía
  const grid: string[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));

  // Llenar la matriz con letras aleatorias
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }

  return grid;
}
