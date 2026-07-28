export const homeStages = [
  {
    id: 'impulse',
    title: 'Impulso',
    subtitle: 'Todo comienza con algo que te mueve',
    description:
      'Una emoción, un recuerdo, una pregunta o una inquietud despierta el deseo de contar. Antes de existir una trama, ya existe algo que necesita ser expresado.',
    svgColor: 'var(--color-amber-400)',
  },
  {
    id: 'meeting',
    title: 'Encuentro',
    subtitle: 'La historia que despierta tu interés',
    description:
      'Un periodo, un lugar o un suceso histórico se convierte en el punto de partida. No se trata solo de conocer el pasado, sino de descubrir qué parte de él tiene algo que decirte.',
    svgColor: 'var(--color-purple-400)',
  },
  {
    id: 'look',
    title: 'Mirada',
    subtitle: 'Tu forma de interpretar el mundo',
    description:
      'La historia adquiere una perspectiva propia. Tus preguntas, experiencias e imaginación encuentran una manera particular de observar lo que ocurrió y lo que pudo haber ocurrido.',
    svgColor: 'var(--color-lime-400)',
  },
  {
    id: 'narrative',
    title: 'Narrativa',
    subtitle: 'Donde la historia comienza a respirar',
    description:
      'El tiempo, el lugar, las costumbres y los personajes construyen un entorno coherente. La investigación aporta contexto; tu imaginación le da vida.',
    svgColor: 'var(--color-red-500)',
  },
  {
    id: 'tension',
    title: 'Tensión',
    subtitle: 'Toda historia necesita algo en juego',
    description:
      'Los deseos chocan, las decisiones tienen consecuencias y la realidad conocida comienza a transformarse. En el conflicto, la historia encuentra su dirección y su fuerza.',
    svgColor: 'var(--color-fuchsia-400)',
  },
  {
    id: 'opus',
    title: 'Obra',
    subtitle: 'Una visión propia que puede ser compartida',
    description:
      'Lo que nació como una inquietud se convierte en una narrativa auténtica: una historia que conserva tu voz, dialoga con el pasado y puede conectar con alguien más.',
    svgColor: 'var(--color-primary)',
  },
];

export const homeSvgPaths = [
  // star
  'M50,2 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z',
  // flame
  'M50,92 C31,88 19,75 19,58 C19,42 31,31 43,17 C47,12 49,7 49,2 C65,14 75,29 70,45 C76,42 80,37 82,31 C91,49 87,69 75,80 C68,87 59,91 50,92 Z',
  // brain
  'M50,30 C50,15 30,15 25,30 C15,30 10,45 25,55 C20,70 35,85 50,75 C65,85 80,70 75,55 C90,45 85,30 75,30 C70,15 50,15 50,30 Z',
  // eye
  'M8,50 C20,30 37,18 50,18 C63,18 80,30 92,50 C80,70 63,82 50,82 C37,82 20,70 8,50 Z M50,32 C40,32 32,40 32,50 C32,60 40,68 50,68 C60,68 68,60 68,50 C68,40 60,32 50,32 Z',
  // flower
  'M50,14 C59,14 63,23 60,31 C68,26 78,29 81,37 C84,46 77,53 68,53 C76,58 77,68 70,74 C63,80 54,75 50,66 C46,75 37,80 30,74 C23,68 24,58 32,53 C23,53 16,46 19,37 C22,29 32,26 40,31 C37,23 41,14 50,14 Z',
  // tension knot
  'M50,12 C70,12 86,28 86,47 C86,61 78,71 66,77 C72,68 71,57 63,50 C55,43 44,43 37,49 C29,56 28,67 34,77 C22,71 14,60 14,47 C14,28 30,12 50,12 Z M50,30 C39,30 30,38 30,49 C30,60 39,68 50,68 C61,68 70,60 70,49 C70,38 61,30 50,30 Z',
  // open book
  'M48,30 C37,19 24,19 14,26 C19,45 29,60 48,74 Z M52,30 C63,19 76,19 86,26 C81,45 71,60 52,74 Z',
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
