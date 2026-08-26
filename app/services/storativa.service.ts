import api from '@/lib/api';
import {
  Chapter,
  CreateChapterPayload,
  DeleteStorativaResponse,
  DashboardStorativasQuery,
  IReqStorativa,
  IResStorativa,
  NarrativePlan,
  NarrativePlanConfirmation,
  NarrativePlanStatus,
  PaginatedDashboardStorativas,
  UpdateChapterPayload,
} from '@/interfaces/storativa.interface';

export const getUserStorativas = async ({
  limit,
  offset,
  search,
}: DashboardStorativasQuery): Promise<PaginatedDashboardStorativas> => {
  const { data } = await api.get<PaginatedDashboardStorativas>('/storativa', {
    params: { limit, offset, ...(search ? { search } : {}) },
  });
  return data;
};

export const deleteUserStorativa = async (
  storativaId: string,
): Promise<DeleteStorativaResponse> => {
  const { data } = await api.delete<DeleteStorativaResponse>(
    `/storativa/${storativaId}`,
  );
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

export const getNarrativePlan = async (
  storativaId: string,
): Promise<NarrativePlan | null> => {
  const { data } = await api.get<NarrativePlan | null>(
    `/storativa/${storativaId}/narrative/plan`,
  );
  return data;
};

export const createManualNarrativePlan = async (
  storativaId: string,
): Promise<NarrativePlan> => {
  const { data } = await api.post<NarrativePlan>(
    `/storativa/${storativaId}/narrative/plan/manual`,
  );
  return data;
};

export const createNarrativePlanRevision = async (
  storativaId: string,
): Promise<NarrativePlan> => {
  const { data } = await api.post<NarrativePlan>(
    `/storativa/${storativaId}/narrative/plan/revision`,
  );
  return data;
};

export const generateNarrativePlan = async (
  storativaId: string,
): Promise<NarrativePlan> => {
  const { data } = await api.post<NarrativePlan>(
    `/storativa/${storativaId}/narrative/plan/generate`,
  );
  return data;
};

export const updateNarrativePlan = async (
  storativaId: string,
  plan: NarrativePlan,
): Promise<NarrativePlan> => {
  const { data } = await api.patch<NarrativePlan>(
    `/storativa/${storativaId}/narrative/plan`,
    { ...plan, status: 'draft' satisfies NarrativePlanStatus },
  );
  return data;
};

export const confirmNarrativePlan = async (
  storativaId: string,
): Promise<NarrativePlanConfirmation> => {
  const { data } = await api.post<NarrativePlanConfirmation>(
    `/storativa/${storativaId}/narrative/plan/confirm`,
  );
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
