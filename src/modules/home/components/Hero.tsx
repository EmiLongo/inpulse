// src/modules/home/components/Hero.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import hero from "@img/hero/hero.svg";
import {
  customFonts,
  SubtitleXL,
  TitleHero,
  TitleHero2,
} from "@theme/textStyles";
import { useTranslate } from "@shared/utils/translate";

export const Hero: React.FC = () => {
  const theme = useTheme();
  const isDesktopXL = useMediaQuery(theme.breakpoints.up(1700));
  const { t } = useTranslate();
  return (
    <>
      {/* titulo h1 para el SEO, no se muestra */}
      <TitleHero
        variant="h1"
        component="h1"
        sx={{
          fontSize: "0.5rem",
          position: "absolute",
          top: "-100%",
          left: "-100%",
        }}
      >
        {t.hero.h1}
      </TitleHero>
      {/* container del hero */}
      <Box
        component={"section"}
        id="hero"
        sx={{
          height: {xs: "675px", lg: "810px", xl: "1010px"},
          position: "relative",
          color: "grey.50",
          backgroundColor: "background.default",
        }}
      >
        {/* Imagen hero de fondo */}
        <Box
          component={"img"}
          src={hero}
          alt="Imagen Hero Inpulse Design"
          sx={{
            height: { xs: "675px", lg: "810px", xl: "1010px" },
            position: "absolute",
            top: { xs: "-94px", lg: "-113px", xl: "-231px" },
            left: "0.5px",
            zIndex: 1,
          }}
        />
        {/* Somos Inpulse Design */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "unset", md: "center" },
            gap: { xs: "1rem", sm: 0, md: "1rem" },
            marginX: { xs: "auto", sm: "10rem", md: "auto" },
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: { xs: "85px", sm: "210px", md: "240px", lg: "290px" },
              paddingLeft: { xs: "102px", sm: "175px", md: "12rem", lg: 0 },
              zIndex: 110,
            }}
          >
            <TitleHero2 sx={{ fontWeight: 400, marginBottom: "0.4rem" }}>
              {t.hero.title1}
            </TitleHero2>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TitleHero>{t.hero.title2}</TitleHero>
              <TitleHero sx={{ marginLeft: { xs: "2.55rem", md: "1.5rem" } }}>
                {t.hero.title3}
              </TitleHero>
            </Box>
          </Box>
        </Box>

        {/* Le damos pulso a tu marca */}
        <Box
          sx={{
            zIndex: 100,
            position: "absolute",
            top: { xs: "470px", lg: "550px", xl: "600px" },
            right: {
              xs: "1rem",
              md: "4rem",
              lg: "8rem",
              xl: isDesktopXL ? "20rem" : "16rem",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: { xs: "1rem", sm: "0.5rem" },
          }}
        >
          <SubtitleXL
            sx={{
              color: "primary.100",
              textAlign: "right",
              lineHeight: 1.1,
              width: { xs: "12ch", sm: "100%" },
              fontWeight: 400,
              textShadow: customFonts.shadow.titulos,
            }}
          >
            {t.hero.subtitle1}
          </SubtitleXL>
          {/* <Text1 
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
          </Text1> */}
          {/* <ColorButton
            id="bt-hero-desktop-contact"
            type="greenButton"
            fetchingText=""
            isFetching={false}
            disabled={false}
            sx={{
              display: { xs: "none", sm: "flex" },
              marginTop: { sm: "1rem" },
              height: { xs: "30px", md: "36px" },
              width: {
                xs: "180px",
                sm: "340px",
                md: "407px",
                lg: "482px",
                xl: "582px",
              },
            }}
            text={t.hero.button}
            onClick={() => (window.location.href = "/#contact")}
          /> */}
        </Box>
        {/* {isMini && (
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              width: "100%",
              justifyContent: "center",
              paddingTop: "375px",
            }}
          >
            <ColorButton
              id="bt-hero-mobile-contact"
              type="greenButton"
              fetchingText=""
              isFetching={false}
              disabled={false}
              text={t.hero.button}
              onClick={() => (window.location.href = "/#contact")}
            />
          </Box>
        )} */}
      </Box>
    </>
  );
};
