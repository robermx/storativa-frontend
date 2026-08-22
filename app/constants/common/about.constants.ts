import { type ActionVariant } from '@/components/shared/action/action.types';
import { BadgeCheck, ChevronRight, Layers3, Sparkles } from 'lucide-react';

export const aboutPillars = [
  {
    title: 'Algo que te despierta',
    description:
      'Inquietud, recuerdos y/o sentimientos pueden ser el propósito inicial de emprender un viaje dentro de la mente.',
    icon: Layers3,
  },
  {
    title: 'El mundo para explorar',
    description:
      'Toda historia parte de elementos representativos y simbólicos basados en entorno que entendemos y percibimos',
    icon: BadgeCheck,
  },
  {
    title: 'Un mensaje que trasciende',
    description:
      'Storativa establece las base y ayuda a crear un estilo propio destacando las ideas propias de cada autor',
    icon: Sparkles,
  },
];

export const aboutStages = [
  'Escuchar la inquietud. Reconocer aquello que despierta tu deseo de escribir.',
  'Encontrar el contexto. Explorar el momento histórico, el lugar y las circunstancias que alimentan la idea.',
  'Dar forma y compartir. Construir una narrativa propia que pueda conectar con alguien más.',
];

export const aboutDynamicContent = [
  {
    id: 'emotion',
    title: 'Emoción',
    heading: 'Comenzar con algo que te mueve.',
    description:
      'Una inquietud, recuerdo o emoción puede ser el inicio de algo que adquiere forma y se simplifica en una nueva tendencia.',
  },
  {
    id: 'context',
    title: 'Contexto',
    heading: 'La realidad puede darle forma a tu idea.',
    description:
      'Los periodos, lugares y sucesos históricos aportan contexto para que la imaginación encuentre un terreno coherente.',
  },
  {
    id: 'voice',
    title: 'Voz propia',
    heading: 'Tu visión es el centro de la historia.',
    description:
      'Storativa acompaña el proceso, pero la esencia, las decisiones y el sentido de la obra pertenecen al autor.',
  },
];

export const aboutLinks = [
  {
    id: 1,
    to: '/register',
    label: 'Comenzar con mi Storativa',
    variant: 'primary' as ActionVariant,
    icon: ChevronRight,
  },
  {
    id: 2,
    to: '/login',
    label: 'Iniciar sesión',
    variant: 'outline' as ActionVariant,
    icon: undefined,
  },
];
