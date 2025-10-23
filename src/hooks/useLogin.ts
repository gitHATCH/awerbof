import { useCallback, useState } from 'react';
import { authApi, type LoginPayload, type LoginResponse } from '../api/authApi';

interface UseLoginState {
  isLoading: boolean;
  error: string;
  errorMessageId: string | null;
  data: LoginResponse | null;
}

const initialState: UseLoginState = {
  isLoading: false,
  error: '',
  errorMessageId: null,
  data: null,
};

const useLogin = () => {
  const [state, setState] = useState<UseLoginState>(initialState);

  const login = useCallback(async (payload: LoginPayload): Promise<LoginResponse | null> => {
    try {
      setState({ isLoading: true, error: '', errorMessageId: null, data: null });
      const response = await authApi.login(payload);
      setState({ isLoading: false, error: '', errorMessageId: null, data: response });
      return response;
    } catch (error) {
      setState({
        isLoading: false,
        data: null,
        error: error instanceof Error ? error.message : '',
        errorMessageId: error instanceof Error ? null : 'login.error.unexpected',
      });
      return null;
    }
  }, []);

  return {
    login,
    ...state,
  };
};

export default useLogin;
