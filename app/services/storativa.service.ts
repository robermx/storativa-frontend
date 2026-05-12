import api from '@/lib/api';
import { IStorativa } from '@/interfaces/storativa.interface';

export const getUserStorativas = async (): Promise<IStorativa[]> => {
  const { data } = await api.get('/storativa');
  return data;
};
