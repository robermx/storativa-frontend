import api from '@/lib/api';
import type { InitialPanoramaResponse } from '@/interfaces/ai.interface';

export const getInitialPanorama = async (
  storativaId: string,
): Promise<InitialPanoramaResponse> => {
  const { data } = await api.get<InitialPanoramaResponse>(
    `/ai/storativas/${storativaId}/initial-panorama`,
  );
  return data;
};

export const createInitialPanorama = async (
  storativaId: string,
): Promise<InitialPanoramaResponse> => {
  const { data } = await api.post<InitialPanoramaResponse>(
    `/ai/storativas/${storativaId}/initial-panorama`,
  );
  return data;
};
