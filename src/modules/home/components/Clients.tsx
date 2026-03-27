// src/modules/home/components/Clients.tsx
import React from "react";
import { Box } from "@mui/material";
import { greyColor } from "@/theme/theme";
import { SubtitleXL } from "@/theme/textStyles";
import { useTranslate } from "@/shared/utils/translate";

export const Clients: React.FC = () => {
  const { t } = useTranslate();
  return (
    <Box
      component={"section"}
      sx={{
        width: "100vw",
        backgroundColor: "background.default",
        paddingTop: {xs:"3rem", md: 0},
        paddingBottom: "3rem",
        borderRadius: {xs: "50px", md: "100px"},
        color: greyColor[50],
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SubtitleXL>{t.clients.title1}</SubtitleXL>
    </Box>
  );
}