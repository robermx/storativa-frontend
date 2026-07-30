import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown, fallback: string) => {
    if (!(error instanceof AxiosError)) return fallback;

    const responseData = error.response?.data as
      { message?: string | string[] } | undefined;
    return Array.isArray(responseData?.message)
      ? responseData.message[0]
      : responseData?.message || fallback;
  };