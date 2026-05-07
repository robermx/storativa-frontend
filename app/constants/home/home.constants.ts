export const homeStages = [
  {
    id: 'chispa',
    title: 'La Chispa',
    subtitle: 'Todo comienza con una idea',
    description:
      'En la quietud de la mente, un destello apenas perceptible. Una pregunta sin respuesta, un deseo sin nombre. Así nace todo lo grande.',
    // bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
    textColor: 'text-amber-400',
    accentColor: 'text-amber-300/60',
    svgColor: '#fbbf24',
  },
  {
    id: 'pensamiento',
    title: 'El Pensamiento',
    subtitle: 'La idea toma forma',
    description:
      'Lo que era invisible comienza a delinearse. Contornos suaves, posibilidades infinitas. La mente trabaja en silencio, tejiendo conexiones.',
    // bgGradient: 'from-indigo-950 via-slate-900 to-indigo-950',
    textColor: 'text-indigo-400',
    accentColor: 'text-indigo-300/60',
    svgColor: '#818cf8',
  },
  {
    id: 'forma',
    title: 'La Forma',
    subtitle: 'Estructura y propósito',
    description:
      'El caos se organiza. Líneas que convergen, ángulos que definen. Lo abstracto se vuelve tangible, lo etéreo cobra solidez.',
    // bgGradient: 'from-emerald-950 via-slate-900 to-emerald-950',
    textColor: 'text-emerald-400',
    accentColor: 'text-emerald-300/60',
    svgColor: '#34d399',
  },
  {
    id: 'conexion',
    title: 'La Conexión',
    subtitle: 'Nada existe aislado',
    description:
      'Las formas se encuentran, se entrelazan. Cada conexión genera nuevas posibilidades. La red crece, se fortalece, se vuelve viva.',
    // bgGradient: 'from-rose-950 via-slate-900 to-rose-950',
    textColor: 'text-rose-400',
    accentColor: 'text-rose-300/60',
    svgColor: '#fb7185',
  },
  {
    id: 'expansion',
    title: 'La Expansión',
    subtitle: 'Más allá de los límites',
    description:
      'Lo que era pequeño ahora se extiende. Colores que explotan, patrones que emergen. La creación trasciende su origen.',
    // bgGradient: 'from-violet-950 via-slate-900 to-violet-950',
    textColor: 'text-violet-400',
    accentColor: 'text-violet-300/60',
    svgColor: '#a78bfa',
  },
  {
    id: 'obra',
    title: 'La Obra',
    subtitle: 'Algo que cautiva',
    description:
      'El viaje se completa. Lo que comenzó como un destello ahora es una experiencia que transforma a quien la contempla.',
    // bgGradient: 'from-amber-950 via-slate-900 to-amber-950',
    textColor: 'text-amber-400',
    accentColor: 'text-amber-300/60',
    svgColor: '#fbbf24',
  },
];

export const homeSvgPaths = [
  'M50,10 L55,40 L85,40 L60,55 L70,85 L50,65 L30,85 L40,55 L15,40 L45,40 Z',
  'M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z',
  'M50,5 C70,20 90,40 90,50 C90,60 70,80 50,95 C30,80 10,60 10,50 C10,40 30,20 50,5 Z',
  'M50,10 C65,10 80,20 85,35 C90,50 85,65 70,80 C55,90 45,90 30,80 C15,65 10,50 15,35 C20,20 35,10 50,10 Z',
  'M50,5 C58,5 65,15 70,30 C80,25 90,30 90,40 C90,50 80,55 70,50 C65,65 58,75 50,75 C42,75 35,65 30,50 C20,55 10,50 10,40 C10,30 20,25 30,30 C35,15 42,5 50,5 Z',
  'M50,10 C60,10 70,15 75,25 C85,20 95,25 95,35 C95,45 85,50 75,45 C80,55 85,65 75,75 C65,85 55,90 50,90 C45,90 35,85 25,75 C15,65 20,55 25,45 C15,50 5,45 5,35 C5,25 15,20 25,25 C30,15 40,10 50,10 Z',
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
