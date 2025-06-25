// src/modules/home/components/Hero.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import hero from "@img/hero/hero.svg";
import { customFonts, Text1, TitleHero, TitleHero2 } from "@/theme/textStyles";
import { useTranslate } from "@/shared/utils/translate";
import { Typewriter } from 'react-simple-typewriter';
import { ColorButton } from "@/shared/components/ColorButton";

export const Hero: React.FC = () => {
  const theme = useTheme();
  const isMini = useMediaQuery(theme.breakpoints.down(400));
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: {xs: "center", sm: "unset", md: "center"},
          gap: "1rem",
          marginX: {xs: "auto", sm: "10rem", md: "auto"},
          zIndex: 100,
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: {xs: "25vh", sm: "25vh", md: "30vh", lg: "35vh"},
            paddingLeft: {xs: 0, md: "12rem", lg: 0},
            zIndex: 110,
          }}>
            <TitleHero2 sx={{ fontWeight: 400, }}>{t.hero.title1}</TitleHero2>
            <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"},}}>
              <TitleHero >{t.hero.title2}</TitleHero>
              <TitleHero sx={{marginLeft: {xs: "26%", sm: "3.2rem", md: "1.5rem"}}}>{t.hero.title3}</TitleHero>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          zIndex: 100,
          position: "absolute",
          top: {xs: "73%", sm: "77%", md: "77%"},
          right: {xs: "1rem", sm: "2rem", md: "4rem", lg: "8rem", xl: isDesktopXL ? "20rem" : "16rem"},
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: {xs: "1rem", sm: "0.5rem"},
        }}>
          <TitleHero2 sx={{ 
            color: "primary.100", 
            textAlign: "right", 
            lineHeight: 1.1, 
            width: {xs: "12ch", sm: "100%"},
            fontWeight: 400,
            textShadow: customFonts.shadow.titulos,

          }}
          >
          {t.hero.subtitle1}
          </TitleHero2>
          <Text1 
            sx={{ 
              fontWeight: 300, 
              textAlign: "right", 
              textWrap: "wrap", 
              maxWidth: { xs: "14ch", sm: "100%" },
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
              cursorBlinking={true}
              typeSpeed={70}
              deleteSpeed={0}
              delaySpeed={1500}
            />
          </Text1>
          <ColorButton
            type="greenButton"
            fetchingText=""
            isFetching={false}
            disabled={false}
            sx={{ display: {xs: "none", sm: "flex"}, marginTop: {sm: "1rem"}}}
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