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
}

export interface AdaptedPeriod {
  from: string;
  to: string;
  name: string;
  place: string;
}
