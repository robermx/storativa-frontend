import api from '@/lib/api';
import { IReqStorativa, IResStorativa } from '@/interfaces/storativa.interface';

export const getUserStorativas = async (): Promise<IResStorativa[]> => {
  const { data } = await api.get('/storativa');
  return data;
};

export const createUserStorativa = async (
  reqData: IReqStorativa,
): Promise<IResStorativa> => {
  const { data } = await api.post('/storativa', reqData);
  return data;
};
