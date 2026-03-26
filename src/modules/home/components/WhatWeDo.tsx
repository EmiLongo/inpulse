// src/modules/home/components/WhatWeDo.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Text1, Text3, Text4, TextBody6, Title3 } from "@/theme/textStyles";
import { useTranslate } from "@/shared/utils/translate";
import { greyColor } from "@/theme/theme";
import { SwitchCustom } from "./SwitchCustom";
import commerce from "@img/hero/commerce.svg";
import corporative from "@img/hero/corporative.svg";
import handClick from "@img/hero/hand_click.svg";
import shakingHands from "@img/hero/shaking_hands.svg";

type ProductColorType = "lightBlue" | "green" | "pink" | "violet";

export const WhatWeDo: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslate();
  const products = [
    {switchColor: "lightBlue",
      icon: commerce,
      title: t.whatWeDo.product1Title,
      subtitle:t.whatWeDo.product1Subtitle,
    }, 
    {switchColor: "green",
      icon: shakingHands,
      title:t.whatWeDo.product2Title,
      subtitle:t.whatWeDo.product2Subtitle,
    }, 
    {switchColor: "pink",
      icon: handClick,
      title:t.whatWeDo.product3Title,
      subtitle:t.whatWeDo.product3Subtitle,
    }, 
    {switchColor: "violet",
      icon: corporative,
      title:t.whatWeDo.product4Title,
      subtitle:t.whatWeDo.product4Subtitle,
    }
  ];
  return (
    <>
      <Box
        component={"section"}
        sx={{
          backgroundColor: "background.default",
          paddingTop: {xs:"3rem", md: 0},
          paddingBottom: "3rem",
          borderBottomLeftRadius: {xs: "50px", md: "100px"},
          borderBottomRightRadius: {xs: "50px", md: "100px"},
          color: greyColor[50],
          display: "flex",
          justifyContent: "center",
          marginTop: "-5px",
        }}
      >
        <Box sx={{width: "100%", maxWidth: "1210px"}}>

          {/* titulos */}
          {isMobile ?
          <>
          <Text4 sx={{ 
            textAlign: "center",
            width: "100%",
          }}>
            {t.whatWeDo.subtitle1}
          </Text4>
          <Text3 sx={{ 
            textAlign: "center",
            width: "100%",
          }}>
          {t.whatWeDo.title1}
          </Text3>
          </>
          :
          <>
          <Text3 sx={{ 
            textAlign: "left",
            width: "100%",
          }}>
            {t.whatWeDo.subtitle1}
          </Text3>
          <Text1 sx={{ 
            textAlign: "left",
            width: "100%",
          }}>
          {t.whatWeDo.title1}
          </Text1>
          </>
          }

          {/* cajas de switch */}
          <Box sx={{display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: "2rem",
            marginTop: "2rem",
          }}>
            {products.map((item, index) => (
              <Box
                key={`checkbox-${index}-${item.switchColor}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: {xs: "0.5rem", md: "1.5rem"},
                }}
              >
                {/* Switch */}
                <SwitchCustom colorType={item.switchColor as ProductColorType} icon={item.icon} />

                {/* Textos */}
                <Title3 sx={{ 
                  textAlign: "center",
                  width: "100%",
                }}>
                  {item.title}
                </Title3>
                <TextBody6 sx={{ 
                  textAlign: "center",
                  width: "100%",
                  paddingX: {xs: "1rem", md: "2.5rem"},
                }}>
                  {item.subtitle}
                </TextBody6>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
