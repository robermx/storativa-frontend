import { variantType } from '@/interfaces/nav-link.interface';
import { BadgeCheck, ChevronRight, Layers3, Sparkles } from 'lucide-react';

export const aboutPillars = [
  {
    title: 'Algo que te mueve',
    description:
      'Una inquietud, recuerdo o emoción puede ser el inicio de una historia que todavía no tiene forma.',
    icon: Layers3,
  },
  {
    title: 'Un mundo que explorar',
    description:
      'Los periodos, lugares y sucesos históricos aportan contexto para que la imaginación encuentre un terreno coherente.',
    icon: BadgeCheck,
  },
  {
    title: 'Una voz que permanece',
    description:
      'Storativa acompaña el proceso, pero la mirada, las decisiones y el sentido de la obra pertenecen al autor.',
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
    heading: 'Todo comienza con algo que te mueve.',
    description:
      'Una inquietud, recuerdo o emoción puede ser el inicio de una historia que todavía no tiene forma.',
  },
  {
    id: 'context',
    title: 'Contexto',
    heading: 'Un mundo puede darle forma a tu idea.',
    description:
      'Los periodos, lugares y sucesos históricos aportan contexto para que la imaginación encuentre un terreno coherente.',
  },
  {
    id: 'voice',
    title: 'Voz propia',
    heading: 'Tu mirada es el centro de la historia.',
    description:
      'Storativa acompaña el proceso, pero la mirada, las decisiones y el sentido de la obra pertenecen al autor.',
  },
];

export const aboutLinks = [
  {
    id: 1,
    path: '/register',
    displayName: 'Crear mi Storativa',
    variant: variantType.contained,
    icon: ChevronRight,
  },
  {
    id: 2,
    path: '/login',
    displayName: 'Iniciar sesión',
    variant: variantType.outlined,
    icon: null,
  },
];
