import api from '@/lib/api';
import { IStorativa } from '@/interfaces/storativa.interfave';

export const getUserStorativas = async (): Promise<IStorativa[]> => {
  const response = await api.get('/storativa');
  return response.data;
};
