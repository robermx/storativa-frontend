import type { JSONContent } from '@tiptap/react';

export interface IReqStorativa {
  title: string;
  centralIdea: string;
  adaptedPeriods: AdaptedPeriod[];
  characters: Character[];
  contextType: number[];
  storySize: number;
  timeToComplete: number | string;
  initialBasedDate: string;
  genderLabels: number[];
  content: string;
  narrativeInput?: NarrativeInput;
}

export interface IResStorativa {
  userId: string;
  title: string;
  author: string;
  centralIdea: string;
  characters: Character[];
  contextType: number[];
  storySize: number;
  timeToComplete: number;
  initialBasedDate: string;
  adaptedPeriods: AdaptedPeriod[];
  genderLabels: number[];
  content: string;
  chapters: Chapter[];
  status: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  narrativeInput?: NarrativeInput;
  narrativePlan: NarrativePlan | null;
}

export type NarrativePlanStatus = 'draft' | 'confirmed';
export type NarrativePointOfView =
  'first_person' | 'third_person_limited' | 'third_person_omniscient';

export interface NarrativeInput {
  language?: 'es';
  protagonistCharacterKey?: string;
  tone?: string;
  pointOfView?: NarrativePointOfView;
  theme?: string;
  desiredEnding?: 'open' | 'closed' | 'hopeful' | 'tragic' | 'surprising';
  mustInclude?: string[];
  mustAvoid?: string[];
}

export interface NarrativeCharacterPlan {
  characterKey: string;
  narrativeRole: string;
  motivation: string;
  internalConflict: string;
  arc: string;
}

export interface NarrativeCatalogSnapshot {
  contextTypes: string[];
  genderLabels: string[];
  storySize: string;
  characterRoles: Record<string, string>;
}

export interface NarrativeChapterPlan {
  order: number;
  title: string;
  objective: string;
  summary: string;
  conflict: string;
  turningPoint: string;
  endingHook: string;
}

export interface NarrativePlan {
  status: NarrativePlanStatus;
  language: 'es';
  premise: string;
  theme: string;
  centralConflict: string;
  protagonistGoal: string;
  stakes: string;
  tone: string;
  pointOfView: NarrativePointOfView;
  catalogSnapshot: NarrativeCatalogSnapshot;
  characters: NarrativeCharacterPlan[];
  chapters: NarrativeChapterPlan[];
}

export interface DashboardStorativa {
  _id: string;
  title: string;
  status: number;
  timeToComplete: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  page: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StorativaStats {
  total: number;
  active: number;
  inactive: number;
}

export interface PaginatedDashboardStorativas {
  data: DashboardStorativa[];
  meta: PaginationMeta;
  stats: StorativaStats;
}

export interface DashboardStorativasQuery {
  limit: number;
  offset: number;
  search?: string;
}

export interface DeleteStorativaResponse {
  message: string;
  status: 'success';
  code: number;
}

export interface Chapter {
  _id: string;
  title: string;
  order: number;
  content: JSONContent;
}

export interface CreateChapterPayload {
  title?: string;
  content?: JSONContent;
}

export interface UpdateChapterPayload {
  title?: string;
  content?: JSONContent;
}

export interface Character {
  type: number;
  name: string;
  physical: string;
  psychological: string;
  social: string;
  additional?: string;
  characterKey?: string;
}

export interface AdaptedPeriod {
  from: string;
  to: string;
  name: string;
  place: string;
}
