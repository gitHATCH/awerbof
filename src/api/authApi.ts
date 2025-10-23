import axiosClient from './axiosClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  [key: string]: unknown;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/auth/login', payload);
    return response.data;
  },
};

export default authApi;
