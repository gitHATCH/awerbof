import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import LoginPage from './pages/LoginPage';
import { defaultLocale, messages, type Locale } from './i18n/messages';

const App = () => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const localeMessages = useMemo(() => messages[locale], [locale]);

  return (
    <IntlProvider locale={locale} messages={localeMessages} defaultLocale={defaultLocale}>
      <Box
        component="main"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
        sx={{
          backgroundColor: 'background.default',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-20%',
            backgroundImage:
              'radial-gradient(circle at center, rgba(34,197,94,0.28) 0.6px, transparent 0.6px)',
            backgroundSize: '42px 42px',
            opacity: 0.55,
            transform: 'translateX(18%)',
            maskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,1) 65%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,1) 65%)',
          },
        }}
      >
        <LoginPage locale={locale} onLocaleChange={setLocale} />
      </Box>
    </IntlProvider>
  );
};

export default App;
