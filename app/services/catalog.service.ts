import api from '@/lib/api';
import { Icatalog } from '@/interfaces/catalog.interface';

export const getCharacterCatalog = async (): Promise<Icatalog[]> => {
  const { data } = await api.get('/character');
  return data;
};

export const getContextCatalog = async (): Promise<Icatalog[]> => {
  const { data } = await api.get('/context');
  return data;
};

export const getStorySizeCatalog = async (): Promise<Icatalog[]> => {
  const { data } = await api.get('/story-size');
  return data;
};
