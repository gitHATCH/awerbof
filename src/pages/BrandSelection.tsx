import { useEffect, useMemo, useState, useCallback } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
import { useAuth } from '../auth/AuthContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Stack,
} from '@mui/material';
import CorporateFareRounded from '@mui/icons-material/CorporateFareRounded';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import logoPrincipal from '../assets/img/logo-principal.png';
import logoSecundario from '../assets/img/logo-secundario.png';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import type { PaletteMode } from '@mui/material';
import { availableLocales, type Locale } from '../i18n/messages';

interface BrandSelectionProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  mode: PaletteMode;
  onModeChange: (mode: PaletteMode) => void;
}

const BrandSelection = ({ locale, onLocaleChange, mode, onModeChange }: BrandSelectionProps) => {
  const { logout, user, loading, selectBrand, userBrands, brand } = useAuth();

  const brandColors = useMemo(
    () => ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#f43f5e', '#06b6d4', '#84cc16', '#d946ef'],
    []
  );

  const theme = useTheme();
  const intl = useIntl();
  const logoSrc = theme.palette.mode === 'dark' ? logoSecundario : logoPrincipal;

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: ['easeOut'], delay: custom },
    }),
  };

  useEffect(() => {
    document.title = 'Selección de marca - AWER';
  }, []);

  if (loading || !user) {
    return (
      <Box className="flex items-center justify-center" sx={{ minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleLogout = () => { logout(); };
  const handleBrandSelect = (brandId: number) => { selectBrand(brandId); };

  // Embla (Loop)
  const emblaOptions: EmblaOptionsType = useMemo(
    () => ({
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
      dragFree: false,
      skipSnaps: false,
    }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Centrar inicialmente la marca elegida
  useEffect(() => {
    if (!emblaApi || !userBrands?.length) return;
    const selectedId = brand?.id ? Number(brand.id) : null;
    if (selectedId == null) return;
    const index = userBrands.findIndex((b: any) => Number(b.id) === selectedId);
    if (index >= 0) emblaApi.scrollTo(index, true);
  }, [emblaApi, brand?.id, userBrands]);

  return (
    <Box className="min-h-screen flex flex-col sm:flex-row items-center justify-center p-4 relative overflow-hidden">
      <Card
        sx={{
          width: 'min(92vw, 980px)',  // card más grande y fluida
          mx: 'auto',
          boxShadow: 6,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <CardHeader
          sx={{ pb: { xs: 0.5, md: 1 } }}
          title={
            <Box className="text-center space-y-3">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={theme.palette.mode}
                      src={logoSrc}
                      alt="AWER Logo"
                      style={{ height: 52, width: 'auto', objectFit: 'contain' }}
                      initial={{ opacity: 0, scale: 0.98, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } }}
                      exit={{ opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.2 } }}
                    />
                  </AnimatePresence>
                </Box>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <motion.div
                    animate={{
                      scale: [1, 1.06, 1],
                      filter: [
                        'drop-shadow(0 0 0 rgba(16,185,129,0))',
                        'drop-shadow(0 0 10px rgba(16,185,129,0.35))',
                        'drop-shadow(0 0 0 rgba(16,185,129,0))',
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2 }}
                    style={{ display: 'inline-flex' }}
                  >
                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2, p: 1.2, display: 'inline-flex' }}>
                      <CorporateFareRounded />
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>

              {/* Títulos con tamaño fluido */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                <Typography
                  sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' }, fontWeight: 700 }}
                >
                  <FormattedMessage id="brandSelection.title" defaultMessage="Bienvenido a Awer Business" />
                </Typography>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.28}>
                <Typography color="text.secondary" sx={{ fontSize: { xs: '.9rem', sm: '.95rem' } }}>
                  <FormattedMessage id="login.subtitle" defaultMessage="Gestiona las reseñas de tus clientes" />
                </Typography>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.35}>
                <Typography sx={{ mt: 1, fontSize: { xs: '.95rem', md: '1rem' } }}>
                  <FormattedMessage id="brandSelection.prompt" defaultMessage="Selecciona la marca con la que desea ingresar:" />
                </Typography>
              </motion.div>
            </Box>
          }
        />
        <CardContent
          sx={{
            overflow: 'visible',
            px: { xs: 2.5, sm: 3, md: 4 },
            pt: { xs: 1, md: 1.5 },
            pb: { xs: 2.5, md: 3 },
          }}
        >
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.42}>
            {/* CONTROLES + VIEWPORT */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                pt: 1,
                gap: 1,
              }}
            >
              <IconButton
                aria-label="prev"
                onClick={scrollPrev}
                disabled={!canPrev}
                sx={{
                  justifySelf: 'start',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 1,
                  width: 40,
                  height: 40,
                  zIndex: 1,
                }}
              >
                <ChevronLeftRounded />
              </IconButton>

              {/* Embla viewport (overflow Y visible para que no se corte el hover) */}
              <Box
                ref={emblaRef}
                sx={{
                  overflowX: 'hidden',
                  overflowY: 'visible',
                  px: { xs: 2, sm: 2.5, md: 3 },   // peeks laterales
                  pt: 1.5,                          // aire superior
                  pb: { xs: 2, md: 2.5 },
                  '& .embla__container': {
                    display: 'flex',
                    gap: (theme) => theme.spacing(2.2),
                  },
                  '& .embla__slide': {
                    flex: '0 0 70%',                           // mobile: 1 con peeks
                    '@media (min-width: 480px)': { flex: '0 0 55%' },
                    '@media (min-width: 640px)': { flex: '0 0 42%' },
                    '@media (min-width: 900px)': { flex: '0 0 30%' },   // llena mejor desktop
                    '@media (min-width: 1200px)': { flex: '0 0 26%' },  // 3–4 visibles
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'visible',
                  },
                }}
              >
                <Box className="embla__container">
                  {userBrands.map((b: any, index: number) => {
                    const bg = brandColors[index % brandColors.length];
                    const selectedId = brand?.id;
                    const isSelected = selectedId != null && Number(selectedId) === Number(b.id);
                    return (
                      <Box key={b.id} className="embla__slide">
                        <motion.div
                          className="flex flex-col items-center"
                          style={{ position: 'relative', width: '100%', maxWidth: 200 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05 * (index % 10) } }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {isSelected && (
                            <Chip
                              size="small"
                              color="success"
                              label={<FormattedMessage id="brandSelection.selected" defaultMessage="Seleccionada" />}
                              sx={{ position: 'absolute', top: -6, right: -6, zIndex: 1, fontWeight: 600 }}
                            />
                          )}
                          <Button
                            variant="outlined"
                            onClick={() => handleBrandSelect(b.id)}
                            sx={{
                              height: { xs: 84, md: 92 },
                              width: { xs: 84, md: 92 },
                              borderRadius: '50%',
                              p: 0,
                              borderWidth: 2,
                              borderColor: isSelected ? 'success.main' : undefined,
                              boxShadow: isSelected ? '0 0 0 2px rgba(16,185,129,0.25)' : undefined,
                              '&:hover': {
                                transform: 'scale(1.02)',
                                borderColor: isSelected ? 'success.main' : 'primary.main',
                                bgcolor: 'action.hover',
                              },
                              transition: 'transform 150ms ease, border-color 150ms ease',
                              willChange: 'transform',
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: 58, md: 64 },
                                height: { xs: 58, md: 64 },
                                borderRadius: '50%',
                                bgcolor: bg,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                              }}
                            >
                              {b.logoUrl ? (
                                <img
                                  src={b.logoUrl}
                                  alt={b.name}
                                  style={{ width: '72%', height: '72%', borderRadius: '50%', objectFit: 'cover' }}
                                />
                              ) : (
                                <Typography sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                                  {b.name?.charAt(0) ?? '?'}
                                </Typography>
                              )}
                            </Box>
                          </Button>
                          <Typography
                            align="center"
                            sx={{
                              maxWidth: { xs: 140, md: 160 },
                              mt: 0.75,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              fontSize: { xs: '.72rem', md: '.78rem' },
                            }}
                          >
                            {b.name}
                          </Typography>
                        </motion.div>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <IconButton
                aria-label="next"
                onClick={scrollNext}
                disabled={!canNext}
                sx={{
                  justifySelf: 'end',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 1,
                  width: 40,
                  height: 40,
                  zIndex: 1,
                }}
              >
                <ChevronRightRounded />
              </IconButton>
            </Box>
          </motion.div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              mt: { xs: 0.5, md: 1 },
              py: { xs: 1.1, md: 1.3 },
              fontSize: { xs: '.9rem', md: '1rem' },
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: 1.4,
            }}
          >
            <FormattedMessage id="brandSelection.logout" defaultMessage="Cerrar sesión" />
          </Button>
        </CardContent>
      </Card>

      {/* Controles de idioma/tema fuera de la card en pantallas pequeñas */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.55}
        className="sm:hidden w-full flex justify-center mt-4"
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ width: '100%', maxWidth: 980 }}>
          <FormControl size="small" className="w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px]">
            <InputLabel id="brand-language-select-label">
              <FormattedMessage id="app.language" defaultMessage="Idioma" />
            </InputLabel>
            <Select
              labelId="brand-language-select-label"
              id="brand-language-select"
              value={locale}
              label={intl.formatMessage({ id: 'app.language', defaultMessage: 'Idioma' })}
              onChange={(e) => onLocaleChange(e.target.value as Locale)}
            >
              {availableLocales.map((availableLocale) => (
                <MenuItem key={availableLocale} value={availableLocale}>
                  <FormattedMessage id={`app.language.${availableLocale}`} defaultMessage={availableLocale} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip
            title={
              mode === 'dark'
                ? intl.formatMessage({ id: 'theme.dark', defaultMessage: 'Modo oscuro' })
                : intl.formatMessage({ id: 'theme.light', defaultMessage: 'Modo claro' })
            }
          >
            <IconButton
              color="default"
              onClick={() => onModeChange(mode === 'dark' ? 'light' : 'dark')}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                borderRadius: 9999,
                width: 44,
                height: 44,
              }}
              aria-label={
                mode === 'dark'
                  ? intl.formatMessage({ id: 'theme.dark', defaultMessage: 'Modo oscuro' })
                  : intl.formatMessage({ id: 'theme.light', defaultMessage: 'Modo claro' })
              }
            >
              {mode === 'dark' ? <DarkModeRounded /> : <LightModeRounded />}
            </IconButton>
          </Tooltip>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BrandSelection;
