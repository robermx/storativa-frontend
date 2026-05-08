export const homeStages = [
  {
    id: 'chispa',
    title: 'La Idea',
    subtitle: 'Todo comienza desde aqui',
    description:
      'En la quietud de la mente, un destello apenas perceptible. Una pregunta sin respuesta, un deseo sin nombre. Así nace todo lo grande.',
    svgColor: 'var(--color-amber-400)',
  },
  {
    id: 'pensamiento',
    title: 'El Pensamiento',
    subtitle: 'La idea toma forma',
    description:
      'Lo que era invisible comienza a delinearse. Contornos suaves, posibilidades infinitas. La mente trabaja en silencio, tejiendo conexiones.',
    svgColor: 'var(--color-purple-400)',
  },
  {
    id: 'forma',
    title: 'La Forma',
    subtitle: 'Estructura y propósito',
    description:
      'El caos se organiza. Líneas que convergen, ángulos que definen. Lo abstracto se vuelve tangible, lo etéreo cobra solidez.',
    svgColor: 'var(--color-lime-400)',
  },
  {
    id: 'conexion',
    title: 'La Conexión',
    subtitle: 'Nada existe aislado',
    description:
      'Las formas se encuentran, se entrelazan. Cada conexión genera nuevas posibilidades. La red crece, se fortalece, se vuelve viva.',
    svgColor: 'var(--color-red-500)',
  },
  {
    id: 'expansion',
    title: 'La Expansión',
    subtitle: 'Más allá de los límites',
    description:
      'Lo que era pequeño ahora se extiende. Colores que explotan, patrones que emergen. La creación trasciende su origen.',
    svgColor: 'var(--color-fuchsia-400)',
  },
  {
    id: 'obra',
    title: 'La Obra',
    subtitle: 'Algo que cautiva',
    description:
      'El viaje se completa. Lo que comenzó como un destello ahora es una experiencia que transforma a quien la contempla.',
    svgColor: 'var(--color-primary)',
  },
];

export const homeSvgPaths = [
  'M50,2 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z',
  'M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z',
  'M30,20 L80,50 L30,80 Z',
  'M10,90 L10,40 L50,10 L90,40 L90,90 L60,90 L60,60 L40,60 L40,90 Z',
  'M45,10 H55 V45 H90 V55 H55 V90 H45 V55 H10 V45 H45 Z',
  'M50,30 C50,15 30,15 25,30 C15,30 10,45 25,55 C20,70 35,85 50,75 C65,85 80,70 75,55 C90,45 85,30 75,30 C70,15 50,15 50,30 M50,30 V75',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const randomHero = seededRandom(2);
export const homeHeroParticles = Array.from({ length: 20 }, () => ({
  left: randomHero() * 100,
  top: randomHero() * 100,
}));

const randomEnd = seededRandom(2);
export const homeEndParticles = Array.from({ length: 30 }, () => ({
  left: randomEnd() * 100,
  top: randomEnd() * 100,
}));
