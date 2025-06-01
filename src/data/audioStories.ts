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
  },
  {
    id: 4,
    title: "La Mujer De La Mucura",
    description: "La Historia de una mujer que lleva una gran carga en sus hombros y que trasciende de este mundo.",
    audioUrl: "/audio/laMucura.mp3",
    imageUrl: "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1748740477/mitos%20y%20leyendas/AudioHistorias/Gemini_Generated_Image_cmi1micmi1micmi1_uaurql.png",
    duration: "02:27"
  },
  {
    id: 5,
    title: "Mi Esposa Es Un Demonio",
    description: "La historia  de una mujer que no es humana, esposa de un hombre que la ama y que le causa miedo.",
    audioUrl: "/audio/esposaSiniestra.mp3",
    imageUrl: "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1748740448/mitos%20y%20leyendas/AudioHistorias/Gemini_Generated_Image_d6tui0d6tui0d6tu_rsyxga.png",
    duration: "04:51"
  }
];
