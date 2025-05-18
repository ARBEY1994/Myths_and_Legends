import { GameLevel } from "@/types/games";

export const GAME_LEVELS: GameLevel[] = [
  {
    id: "level1",
    name: "El Bosque Encantado",
    description: "Encuentra las 5 diferencias en esta escena",
    originalImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456254/mitos%20y%20leyendas/games/encuentra_la_diferencia/2_wexhu4.png",
    modifiedImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456255/mitos%20y%20leyendas/games/encuentra_la_diferencia/1_k1hpur.png",
    differences: [
      { x: 50.8, y: 79.2, radius: 10, found: false },
      { x: 17.4, y: 37.2, radius: 12, found: false },
      { x: 26.1, y: 95.8, radius: 8, found: false },
      { x: 47.1, y: 68.6, radius: 10, found: false },
      { x: 39.7, y: 26.8, radius: 12, found: false },
    ],
  },
  {
    id: "level2",
    name: "El Bosque de Colores",
    description: "Encuentra las 3 diferencias en esta escena",
    originalImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456933/mitos%20y%20leyendas/games/encuentra_la_diferencia/2_kv9mlk.png",
    modifiedImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456932/mitos%20y%20leyendas/games/encuentra_la_diferencia/1_atwguj.png",
    differences: [
      { x: 18.4, y: 61.4, radius: 5, found: false },
      { x: 48.9, y: 28.6, radius: 5, found: false },
      { x: 62.0, y: 93.2, radius: 5, found: false },
    ],
  },
  {
    id: "level3",
    name: "El Mejor Amigo del Hombre",
    description: "Encuentra las 3 diferencias en esta escena",
    originalImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456781/mitos%20y%20leyendas/games/encuentra_la_diferencia/2_goeb8b.png",
    modifiedImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456781/mitos%20y%20leyendas/games/encuentra_la_diferencia/1_zrioxb.png",
    differences: [
      { x: 7.0, y: 64.2, radius: 5, found: false },
      { x: 83.0, y: 55.6, radius: 5, found: false },
      { x: 4.0, y: 57.8, radius: 5, found: false },
    ],
  },
  {
    id: "level4",
    name: "Dia Soleado",
    description: "Encuentra las 4 diferencias en esta escena",
    originalImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456314/mitos%20y%20leyendas/games/encuentra_la_diferencia/2_kaw2ub.png",
    modifiedImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456314/mitos%20y%20leyendas/games/encuentra_la_diferencia/1_s6ebua.png",
    differences: [
      { x: 27.8, y: 36.4, radius: 5, found: false },
      { x: 24.2, y: 96.6, radius: 5, found: false },
      { x: 90.6, y: 75.4, radius: 5, found: false },
      { x: 84.2, y: 88.2, radius: 5, found: false },
    ],
  },
  {
    id: "level5",
    name: "Los Vegetales se Volvieron Locos",
    description: "Encuentra las 5 diferencias en esta escena",
    originalImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456559/mitos%20y%20leyendas/games/encuentra_la_diferencia/2_kq74xw.png",
    modifiedImage:
      "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1747456559/mitos%20y%20leyendas/games/encuentra_la_diferencia/1_wmwbpm.png",
    differences: [
      { x: 39.3, y: 90.6, radius: 5, found: false },
      { x: 92.0, y: 13.4, radius: 5, found: false },
      { x: 5.4, y: 65.2, radius: 10, found: false },
      { x: 54.6, y: 61.8, radius: 5, found: false },
      { x: 93.6, y: 78.6, radius: 5, found: false },
    ],
  },
];
