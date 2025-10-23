import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
} from '@mui/material';
import {
  AlternateEmailRounded,
  LockRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import type { LoginPayload, LoginResponse } from '../api/authApi';

interface LoginFormProps {
  onSubmit: (payload: LoginPayload) => Promise<LoginResponse | null>;
  isLoading?: boolean;
}

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const intl = useIntl();
  const [values, setValues] = useState<LoginPayload>(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof LoginPayload) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await onSubmit(values);
    if (result) {
      setValues(initialValues);
    }
  };

  const emailLabel = intl.formatMessage({
    id: 'loginForm.emailLabel',
    defaultMessage: 'Email address',
  });

  const passwordLabel = intl.formatMessage({
    id: 'loginForm.passwordLabel',
    defaultMessage: 'Password',
  });

  return (
    <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Stack spacing={2}>
        <FormControl fullWidth required variant="outlined">
          <InputLabel htmlFor="email">{emailLabel}</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            label={emailLabel}
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailRounded color="primary" />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth required variant="outlined">
          <InputLabel htmlFor="password">{passwordLabel}</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange('password')}
            label={passwordLabel}
            startAdornment={
              <InputAdornment position="start">
                <LockRounded color="primary" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={intl.formatMessage({
                    id: 'loginForm.togglePassword',
                    defaultMessage: 'Show password',
                  })}
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      <Stack spacing={1}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isLoading} fullWidth>
          {intl.formatMessage({ id: 'loginForm.submit', defaultMessage: 'Sign in' })}
        </LoadingButton>

        <Box className="flex justify-end">
          <Link component="button" type="button" color="secondary" className="font-medium">
            {intl.formatMessage({
              id: 'loginForm.forgotPassword',
              defaultMessage: 'Forgot your password?',
            })}
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginForm;
