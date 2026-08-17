import api from '@/lib/api';
import {
  Chapter,
  CreateChapterPayload,
  DashboardStorativasQuery,
  IReqStorativa,
  IResStorativa,
  PaginatedDashboardStorativas,
  UpdateChapterPayload,
} from '@/interfaces/storativa.interface';

export const getUserStorativas = async ({
  limit,
  offset,
  search,
}: DashboardStorativasQuery): Promise<PaginatedDashboardStorativas> => {
  const { data } = await api.get('/storativa', {
    params: { limit, offset, ...(search ? { search } : {}) },
  });
  return data;
};

export const createUserStorativa = async (
  reqData: IReqStorativa,
): Promise<IResStorativa> => {
  const { data } = await api.post('/storativa', reqData);
  return data;
};

export const getUserStorativa = async (
  storativaId: string,
): Promise<IResStorativa> => {
  const { data } = await api.get(`/storativa/${storativaId}`);
  return data;
};

export const createStorativaChapter = async (
  storativaId: string,
  payload: CreateChapterPayload = {},
): Promise<Chapter> => {
  const { data } = await api.post(
    `/storativa/${storativaId}/chapters`,
    payload,
  );
  return data;
};

export const updateStorativaChapter = async (
  storativaId: string,
  chapterId: string,
  payload: UpdateChapterPayload,
): Promise<Chapter> => {
  const { data } = await api.patch(
    `/storativa/${storativaId}/chapters/${chapterId}`,
    payload,
  );
  return data;
};

export const deleteStorativaChapter = async (
  storativaId: string,
  chapterId: string,
): Promise<Chapter[]> => {
  const { data } = await api.delete(
    `/storativa/${storativaId}/chapters/${chapterId}`,
  );
  return data;
};

export const reorderStorativaChapters = async (
  storativaId: string,
  chapterIds: string[],
): Promise<Chapter[]> => {
  const { data } = await api.patch(`/storativa/${storativaId}/chapters/order`, {
    chapterIds,
  });
  return data;
};
