// src/modules/home/components/AboutUs.tsx
import { useTranslate } from "@/shared/utils/translate";
import {
  Text1,
  Text3,
  TextBody1,
  TextBody3,
  TextBody5,
} from "@/theme/textStyles";
import { greyColor } from "@/theme/theme";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import startup from "@img/about-us/startup.gif";
import promocion from "@img/about-us/promocion.gif";
import marketing from "@img/about-us/marketing.gif";

export const AboutUs: React.FC = () => {
  const { t } = useTranslate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cardShadow = {boxShadow: `
  0px 1px 3px 0px rgba(0, 0, 0, 0.12),
  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
  0px 2px 1px -1px rgba(0, 0, 0, 0.20)
  `,}
  return (
    <Box
      sx={{
        margin: { xs: "3rem auto", md: "4rem auto" },
        color: greyColor[50],
        position: "relative",
      }}
    >
      <Box id="aboutus" sx={{position: "relative", top: {xs: "-5rem", md: "-10rem"}}}></Box>
      <Box
        sx={{
          maxWidth: "1200px",
          textAlign: "center",
          display: { xs: "block", md: "flex" },
          columnGap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0 auto 1rem auto",
        }}
      >
        {isMobile ? (
          <>
            <TextBody3>{t.aboutUs.text1}</TextBody3>
            <Text3>{t.aboutUs.textBold1}</Text3>
            <TextBody3>{t.aboutUs.text2}</TextBody3>
            <Text3>{t.aboutUs.textBold2}</Text3>
          </>
        ) : (
          <>
            <TextBody1 sx={{ textWrap: "nowrap" }}>{t.aboutUs.text1}</TextBody1>
            <Text1 sx={{ textWrap: "nowrap" }}>{t.aboutUs.textBold1}</Text1>
            <Box>
              <TextBody1 sx={{ textWrap: "nowrap" }}>
                {t.aboutUs.text2}
              </TextBody1>
              <Text1 sx={{ textWrap: "nowrap" }}>{t.aboutUs.textBold2}</Text1>
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          rowGap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {isMobile ? (
          <>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box sx={{
                background: "#FFFFFF",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...cardShadow   
              }}>
                <Box
                  component={"img"}
                  src={startup}
                  alt="animación numero 1"
                  sx={{ width: "60px" }}
                />
              </Box>
              <TextBody5
                sx={{
                  textAlign: "center",
                  textWrap: "balance",
                  width: "200px",
                }}
              >
                {t.aboutUs.reason1}
              </TextBody5>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box sx={{
                background: "#FFFFFF",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...cardShadow 
              }}>
                <Box
                  component={"img"}
                  src={promocion}
                  alt="animación numero 2"
                  sx={{ width: "60px" }}
                />
              </Box>
              <TextBody5
                sx={{
                  textAlign: "center",
                  textWrap: "balance",
                  width: "200px",
                }}
              >
                {t.aboutUs.reason2}
              </TextBody5>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box sx={{
                background: "#FFFFFF",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...cardShadow
              }}>
                <Box
                  component={"img"}
                  src={marketing}
                  alt="animación numero 3"
                  sx={{ width: "60px" }}
                />
              </Box>
              <TextBody5
                sx={{
                  textAlign: "center",
                  textWrap: "balance",
                  width: "200px",
                }}
              >
                {t.aboutUs.reason3}
              </TextBody5>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box sx={{
                background: "#FFFFFF",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",    
                ...cardShadow
              }}>
                <Box
                  component={"img"}
                  src={startup}
                  alt="animación numero 1"
                  sx={{ width: "80px" }}
                />
              </Box>
              <TextBody3
                sx={{
                  textAlign: "center",
                  textWrap: "balance",
                  width: "220px",
                  height: "100px",
                }}
              >
                {t.aboutUs.reason1}
              </TextBody3>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box sx={{
                background: "#FFFFFF",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...cardShadow
              }}>
                <Box
                  component={"img"}
                  src={promocion}
                  alt="animación numero 2"
                  sx={{ width: "80px" }}
                />
              </Box>
              <TextBody3
                sx={{
                  textAlign: "center",
                  textWrap: "balance",
                  width: "220px",
                  height: "100px",
                }}
                >
                {t.aboutUs.reason2}
              </TextBody3>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box sx={{
                background: "#FFFFFF",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...cardShadow
              }}>
                <Box
                  component={"img"}
                  src={marketing}
                  alt="animación numero 3"
                  sx={{ width: "80px" }}
                />
              </Box>
              <TextBody3
                sx={{
                  textAlign: "center",
                  textWrap: "balance",
                  width: "220px",
                  height: "100px",
                }}
              >
                {t.aboutUs.reason3}
              </TextBody3>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
