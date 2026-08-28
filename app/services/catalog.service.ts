import api from '@/lib/api';
import { ICatalog } from '@/interfaces/catalog.interface';

export const getCharacterCatalog = async (): Promise<ICatalog[]> => {
  const { data } = await api.get('/character');
  return data;
};

export const getContextCatalog = async (): Promise<ICatalog[]> => {
  const { data } = await api.get('/context');
  return data;
};

export const getStorySizeCatalog = async (): Promise<ICatalog[]> => {
  const { data } = await api.get('/story-size');
  return data;
};

export const getGenderLabelCatalog = async (): Promise<ICatalog[]> => {
  const { data } = await api.get('/gender-label');
  return data;
};
