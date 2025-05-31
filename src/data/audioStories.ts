export interface AudioStory {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  duration: string;
}

export const audioStories: AudioStory[] = [
  {
    id: 1,
    title: "El Misterio del Triángulo de las Bermudas",
    description: "Explora los enigmas y teorías detrás de la zona más misteriosa del océano, donde barcos y aviones han desaparecido sin dejar rastro.",
    audioUrl: "/audio/triangulo-bermudas.mp3",
    imageUrl: "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1748718028/mitos%20y%20leyendas/AudioHistorias/trianguloImagen_q3m3os.png",
    duration: "03:55"
  },
  {
    id: 2,
    title: "No era mi noche... pero casi",
    description: "Una historia intrigante que te mantendrá al borde del asiento, llena de giros inesperados y momentos de suspenso que desafiarán tus expectativas.",
    audioUrl: "/audio/No-era-mi-noche.mp3",
    imageUrl: "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1748725931/mitos%20y%20leyendas/AudioHistorias/no-era-mi-noche_uenh9u.png",
    duration: "04:18"
  },
  {
    id: 3,
    title: "La Subida del Muerto",
    description: "Una escalofriante historia de terror que te pondrá los pelos de punta. Una leyenda que ha pasado de generación en generación.",
    audioUrl: "/audio/LaSubidadelMuerto.mp3",
    imageUrl: "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1748727138/mitos%20y%20leyendas/AudioHistorias/laSubidaDelMuerto_ohwjp4.png",
    duration: "02:42"
  }
];
