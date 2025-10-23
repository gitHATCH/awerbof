import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { StarRounded } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { FormattedMessage, useIntl } from 'react-intl';
import LoginForm from '../components/LoginForm';
import useLogin from '../hooks/useLogin';
import { availableLocales, type Locale } from '../i18n/messages';

interface LoginPageProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const LoginPage = ({ locale, onLocaleChange }: LoginPageProps) => {
  const intl = useIntl();
  const { login, isLoading, error, errorMessageId, data } = useLogin();

  const successMessage = data
    ? intl.formatMessage({ id: 'login.success', defaultMessage: 'Login successful' })
    : '';

  const displayError = errorMessageId
    ? intl.formatMessage({
        id: errorMessageId,
        defaultMessage: 'An unexpected error occurred while signing in.',
      })
    : error;

  const handleLocaleChange = (event: SelectChangeEvent<Locale>) => {
    onLocaleChange(event.target.value as Locale);
  };

  return (
    <Paper
      elevation={12}
      className="w-full max-w-3xl overflow-hidden border border-emerald-50"
      sx={{ backdropFilter: 'blur(8px)' }}
    >
      <Box className="flex flex-col gap-10 bg-white/95 p-10">
        <Stack direction="column" spacing={6}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                <StarRounded fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h6" className="text-slate-900">
                  <FormattedMessage id="login.brand" defaultMessage="AWER Reviews" />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <FormattedMessage id="login.brandTag" defaultMessage="Business" />
                </Typography>
              </Box>
            </Stack>

            <FormControl size="small" className="min-w-[160px] self-start">
              <InputLabel id="language-select-label">
                <FormattedMessage id="app.language" defaultMessage="Language" />
              </InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={locale}
                label={intl.formatMessage({ id: 'app.language', defaultMessage: 'Language' })}
                onChange={handleLocaleChange}
              >
                {availableLocales.map((availableLocale) => (
                  <MenuItem key={availableLocale} value={availableLocale}>
                    <FormattedMessage
                      id={`app.language.${availableLocale}`}
                      defaultMessage={availableLocale}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Box className="space-y-2 text-center">
            <Typography variant="h4" component="h1" className="font-semibold text-slate-900">
              <FormattedMessage id="login.title" defaultMessage="Business sign in" />
            </Typography>
            <Typography color="text.secondary">
              <FormattedMessage id="login.subtitle" defaultMessage="Access your customer reviews" />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <FormattedMessage
                id="login.caption"
                defaultMessage="Ingresa tus credenciales para administrar la experiencia de tus clientes."
              />
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={3}>
          {displayError ? <Alert severity="error">{displayError}</Alert> : null}

          {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

          <LoginForm onSubmit={login} isLoading={isLoading} />
        </Stack>

        <Box className="space-y-4">
          <Typography variant="body2" color="text.secondary" align="center">
            <FormattedMessage
              id="login.footer.disclaimer"
              defaultMessage="Tus datos están protegidos con estándares de seguridad certificados."
            />
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box className="flex h-20 w-full max-w-[180px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 text-center">
              <Typography variant="subtitle2" className="font-semibold text-emerald-600">
                <FormattedMessage id="login.badges.dataFiscal.title" defaultMessage="DATA FISCAL" />
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <FormattedMessage id="login.badges.dataFiscal.subtitle" defaultMessage="AFIP" />
              </Typography>
            </Box>
            <Box className="flex h-20 w-full max-w-[180px] flex-col items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 px-4 text-center">
              <Typography variant="subtitle2" className="font-semibold text-sky-600">
                <FormattedMessage id="login.badges.approved.title" defaultMessage="AMP" />
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <FormattedMessage
                  id="login.badges.approved.subtitle"
                  defaultMessage="Agencia de Monitoreo de Proveedores"
                />
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginPage;
