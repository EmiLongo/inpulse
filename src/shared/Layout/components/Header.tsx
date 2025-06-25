// components/Header.js
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  Container,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import logoIsotipo from '@img/inpulse_design_logo_isotipo.svg';
import inpulseLogo from "@img/inpulse_design_logo_negro_color.svg";

import TranslateIcon from '@mui/icons-material/Translate';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Text3, Title2, Title3 } from '@theme/textStyles';
import { useLanguageStore } from '@/stores/languageStore';
import { useTranslate } from '@/shared/utils/translate';

export const menuItems = [
  // { text: 'Melena de León', path: '/melena' },
  // { text: 'Cordyceps Militaris', path: '/cordyceps' },
  // { text: 'Reishi', path: '/reishi' },
  // { text: 'Cola de Pavo', path: '/cola-pavo' },
];
type HeaderTranslation = {
  header: {
    [key: string]: string;
  };
};
export const getInfoItems = (t: HeaderTranslation) => [
// { text: 'Inicio', path: '#home' },
{ text: t.header.menuItem1, path: '#game' },
{ text: t.header.menuItem2, path: '#game' },
{ text: t.header.menuItem3, path: '#game' },
{ text: t.header.menuItem4, path: '#contact' },
];
// export const getInfoItems = (t: HeaderTranslation) => [
// // { text: 'Inicio', path: '#home' },
// { text: t.header.menuItem1, path: '#services' },
// { text: t.header.menuItem2, path: '#portfolio' },
// { text: t.header.menuItem3, path: '#aboutus' },
// { text: t.header.menuItem4, path: '#contact' },
// ];

export const glassEffect = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: `
    0px 5px 40px rgba(0, 0, 0, 0.10),
    0px 100px 80px rgba(0, 219, 204, 0.01),
    0px 41.78px 33.42px rgba(0, 0, 0, 0.0503),
    0px 22.34px 17.87px rgba(0, 219, 204, 0.02),
    0px 12.52px 10.02px rgba(0, 219, 204, 0.02),
    0px 6.65px 5.32px rgba(0, 0, 0, 0.0283),
    0px 2.77px 2.21px rgba(0, 0, 0, 0.0197)
  `,
  position: 'relative',
  overflow: 'hidden',
  // Inner shadows con pseudo-elementos
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    boxShadow: `
      inset 0px -28px 84px -24px rgba(190, 255, 251, 0.1),
      inset 0px 0px 2px 2px rgba(189, 255, 250, 0.1),
      inset 0px 0px 8px 5px rgba(189, 255, 250, 0.05),
      inset 0px 0px 16px 1px rgba(255, 255, 255, 0.1)
    `,
  },
}

export const Header: React.FC = () => {
  const { toggleLanguage, language } = useLanguageStore();
  const { t } = useTranslate();
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isDesktopXL = useMediaQuery(theme.breakpoints.up(1700));

  const [mobileOpen, setMobileOpen] = useState(false);

  const infoItems = getInfoItems(t);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogoClick = () => {
    window.location.href = '#hero';
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', position: 'relative', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: "3rem", mb: "2rem" }}>
        <Box 
          component={"img"} 
          src={inpulseLogo} 
          alt="Logo InPulse Design" 
          width="200px" 
          onClick={handleLogoClick}
          decoding="async"
          loading="lazy"
        />
      </Box>
      <Box
        sx={{ position: 'absolute', top: "1rem", right: "1rem" }}
        onClick={handleDrawerToggle}
      >
        <CloseIcon />
      </Box>
      <Box
        sx={{ position: 'absolute', top: "1rem", left: "1rem" }}
        onClick={handleDrawerToggle}
      />
      <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        {/* {menuItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path}>
            <Title2 sx={{ fontSize: '1.2rem', color: palette.text.primary, textTransform: 'none', }}>{item.text}</Title2>
          </Box>
        ))} */}
        {infoItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path}>
            <Title2 sx={{ fontSize: '1.2rem', color: palette.text.primary, textTransform: 'none', }}>{item.text}</Title2>
          </Box>
        ))}
        {/* <IconButton
          aria-label="change language"
          edge="start"
          onClick={() => toggleLanguage()}
          // sx={{ color: palette.grey[50] }}
        >
          <TranslateIcon />
          <Typography>{language}</Typography>
        </IconButton> */}
      </List>
      <Box
        component={"a"}
        href="https://inpulse.com.ar"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          position: 'absolute', bottom: "1rem" 
        }}
      >
        <Box
          component={"img"}
          src={inpulseLogo}
          alt="Logo Inpulse Design"
          width={100}
          decoding="async"
          loading="lazy"
        />
        <Text3 sx={{ color: "inherit",textAlign: "center" }}>
          {t.header.developBy}
        </Text3>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
      id="navbar"
      elevation={0} 
      sx={{
        margin: 0,
        padding: 0,
        position: "fixed",
        top: "1rem",
        height: "40px",
        width: "100%",
        background: "transparent",
      }}
      >
        <Container 
        maxWidth={false}
        sx={{ 
          width: "100%",
          height: '100%',
          minHeight: "unset",
        }}
        >
          <Toolbar disableGutters sx={{ height: '100%', minHeight: {xs: 'unset', md: 'unset'}, }}>
            {isMobile ? (
              // versión móvil
              <>
                <Box sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',  
                  color: "palette.grey[950]",
                }}>
                  <Box 
                  component={"img"}                  
                  src={logoIsotipo}
                  alt="Logo InPulse Design"
                  height="30px"
                  onClick={handleLogoClick}
                  />
                  <Box sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: "12px",
                    padding: "0.5rem",
                    gap: "1rem",
                    ...glassEffect,
                   }}>
                    <IconButton
                      aria-label="change language"
                      edge="start"
                      onClick={() => toggleLanguage()}
                      sx={{ color: palette.grey[50] }}
                    >
                      <TranslateIcon />
                      <Typography>{language}</Typography>
                    </IconButton>
                    <IconButton
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{
                        color: palette.grey[50],
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              // versión escritorio
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                <Box 
                  component={"img"}
                  src={logoIsotipo}
                  alt="Logo InPulse Design"
                  height="30px"
                  onClick={handleLogoClick}
                />
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: {xs: '2rem', lg: '4rem', xl: '5rem'}, 
                  // margingRight: {xs: "1rem", sm: "2rem", md: "4rem", lg: "8rem", xl: isDesktopXL ? "20rem" : "16rem"},
                  paddingX: "1rem",
                  borderRadius: "12px",
                  ...glassEffect 
                }}>
                  {infoItems.map((item) => (
                    <Box
                      key={item.text}
                      component={"a"}
                      href={item.path}
                    >
                      <Title3 sx={{
                        color: palette.grey[50],
                        fontWeight: 400,
                        '&:hover': {
                          color: "primary.400",
                        },
                        textTransform: 'none',
                        margin: 0,
                        padding: 0,
                      }}>
                        {item.text}
                      </Title3>
                    </Box>
                  ))}
                  <IconButton
                    aria-label="change language"
                    edge="start"
                    onClick={() => toggleLanguage()}
                    sx={{ color: palette.grey[50] }}
                  >
                    <TranslateIcon />
                    <Typography>{language}</Typography>
                  </IconButton>
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        {/* Menú lateral en versión móvil */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en móviles
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};