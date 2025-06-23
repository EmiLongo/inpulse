// src/modules/home/components/Hero.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import hero from "@img/hero/hero.svg";
import { customFonts, Text1, TitleHero, TitleHero2 } from "@/theme/textStyles";
import { useTranslate } from "@/shared/utils/translate";
import { Typewriter } from 'react-simple-typewriter';
import { ColorButton } from "@/shared/components/ColorButton";
// import MyGridBox from "./MyGridBox";

export const Hero: React.FC = () => {
  const theme = useTheme();
  const isMini = useMediaQuery(theme.breakpoints.down(400));
  // const isMobile = useMediaQuery(theme.breakpoints.down(500));
  const isDesktopXL = useMediaQuery(theme.breakpoints.up(1700));
  const { t } = useTranslate();
  return (
    <>
      {/* titulo para el SEO, no se muestra */}
      <TitleHero 
        variant="h1" 
        component="h1" 
        sx={{ 
          fontSize: '0.5rem',
          position: 'absolute',
          top: '-100%',
          left: '-100%',
        }}
      >
      {t.hero.h1}
      </TitleHero>
      <Box
        component={"section"} 
        id="hero" 
        sx={{
          height: isMini ? "80vh" : "83vh",
          position: "relative",
          color: "grey.50",
          marginBottom: "3rem",
        }}
      >
        {/* Imagen hero de fondo */}
        <Box component={"img"} src={hero} alt="Imagen Hero Inpulse Design" 
        sx={{
          objectFit: {xs: "unset", md: "cover"},
          minHeight: {xs: "unset", md: "100vh"},
          height: {xs: "100vh", md: "unset"},
          width: {xs: "unset", md: "100%"},
          position: "absolute",
          objectPosition: "left bottom",
          bottom: 0,
          left: 0,
          zIndex: 1,
        }} 
        />
        <Box sx={{
          zIndex: 100,
          position: "absolute",
          top: {xs: "23vh", md: "30vh", lg: "36vh", xl: isDesktopXL ? "35vh" : "38vh"},
          left: {xs: "5.5rem", md: "400px", xl: "32%"},

          // marginTop: "5rem",
        }}>
          <TitleHero2 sx={{ fontWeight: 400, }}>{t.hero.title1}</TitleHero2>
          <Box sx={{ display: "flex", flexDirection: {xs:"column", md:"row"},}}>
            <TitleHero sx={{ color: "inherit"}}>{t.hero.title2}</TitleHero>
            <TitleHero sx={{ color: "inherit", marginLeft: {xs: "26%", md: "1.5rem"}}}>{t.hero.title3}</TitleHero>
          </Box>
        </Box>
        <Box sx={{
          zIndex: 100,
          position: "absolute",
          bottom: {xs: "3rem", md: "10%"},
          right: {xs: "2rem", md: "10%", lg: "15%"},
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          // marginTop: "5rem",
        }}>
          <TitleHero2 sx={{ 
            color: "primary.100", 
            textAlign: "right", 
            lineHeight: 1.1, 
            width: {xs: "12ch", sm: "100%"},
            fontWeight: 400,
            marginBottom: customFonts.space.medium,
            textShadow: customFonts.shadow.titulos
          }}
          >
          {t.hero.subtitle1}
          </TitleHero2>
        </Box>
        <Box sx={{
          zIndex: 100,
          position: "absolute",
          bottom: {xs: "-2rem", sm: "1rem", md: "10%"},
          right: {xs: "2rem", md: "10%", lg: "15%"},
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          height: {xs: "100px", sm: "unset"},
          // marginTop: "5rem",
        }}>
          <Text1 
            sx={{ 
              fontWeight: 300, 
              textAlign: "right", 
              width: { xs: "12ch", sm: "100%" },
            }}
          >
            <Typewriter
              words={[
                t.hero.subtitle2a,
                t.hero.subtitle2b,
                t.hero.subtitle2c,
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={30}
              delaySpeed={1500}
            />
          </Text1>
        </Box>
        <Box sx={{
          zIndex: 100,
          position: "absolute",
          bottom: {xs: "-4rem", sm: "-3rem", md: "0"},
          right: {sm: "2rem", md: "10%", lg: "15%"},
          display: {xs: "none", sm: "flex"},
          flexDirection: "column",
          alignItems: "end",
          // marginTop: "5rem",
        }}>
          <ColorButton
            type="greenButton"
            fetchingText=""
            isFetching={false}
            disabled={false}
            sx={{}}
            text={t.hero.button}
            onClick={() => {}}
          />
        </Box>
      </Box>
      <Box sx={{
        display: {xs: "flex", sm: "none"},
        width: "100%",
        justifyContent: "center",
        marginTop: "2rem",
      }}>
        <ColorButton
          type="greenButton"
          fetchingText=""
          isFetching={false}
          disabled={false}
          sx={{}}
          text={t.hero.button}
          onClick={() => {}}
        />
      </Box>
    </>

  );
};