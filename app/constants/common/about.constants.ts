import { type ActionVariant } from '@/components/shared/action/action.types';
import { BadgeCheck, ChevronRight, Layers3, Sparkles } from 'lucide-react';

export const aboutPillars = [
  {
    id: 'impulse',
    icon: Layers3,
  },
  {
    id: 'world',
    icon: BadgeCheck,
  },
  {
    id: 'message',
    icon: Sparkles,
  },
];

export const aboutStages = [
  { id: 'listen' },
  { id: 'context' },
  { id: 'shape' },
];

export const aboutDynamicContent = [
  {
    id: 'emotion',
  },
  {
    id: 'context',
  },
  {
    id: 'voice',
  },
];

export const aboutLinks = [
  {
    id: 1,
    to: '/register',
    labelKey: 'start',
    variant: 'primary' as ActionVariant,
    icon: ChevronRight,
  },
  {
    id: 2,
    to: '/login',
    labelKey: 'login',
    variant: 'outline' as ActionVariant,
    icon: undefined,
  },
];
