// src/modules/home/components/SwitchCustom.tsx
import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

type SwitchCustomProps = {
  colorType: "lightBlue" | "green" | "pink" | "violet";
  icon: string;
}
export const SwitchCustom: React.FC<SwitchCustomProps> = ({ colorType, icon }) => {
  const color = {
    lightBlue: {linear1: "#00DBCC", linear2: "#00998F"},
    green: {linear1: "#CDFEAC", linear2: "#7BBB62"},
    pink: {linear1: "#EA6CD7", linear2: "#B31A9B"},
    violet: {linear1: "#8A94FF", linear2: "#4D5CFF"},
  };
  const [isSelected, setIsSelected] = useState(true);
  const linearGradient = `linear-gradient(to left, ${color[colorType].linear1}, ${color[colorType].linear2})`;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        width: {xs: "136px", md: "172px"},
        height: {xs: "74px", md: "94px"},
        borderRadius: "50px",
        background: isSelected ? "background.paper" : linearGradient,
        backgroundColor: "background.paper",
        cursor: "pointer",
        transition: "all 0.6s ease-in-out",
        display: "flex",
        alignItems: "center",
        boxShadow: `
          3px 4px 4px rgba(0,0,0,0.45),
          0px 0px 2px rgba(0,0,0,0.42),
          -2px -2px 5px rgba(225,234,255,0.23),

          inset 0.2px 0.2px 1px rgba(241,246,255,0.25),
          inset 0px -2px 4px rgba(183,208,255,0.35),
          inset 3px 3px 7px rgba(0,0,0,0.15),
          inset 1px 1px 2px rgba(0,0,0,0.30),
          inset 2px 2px 3px rgba(0,0,0,0.55)
        `,
        position: "relative",
      }}
      onClick={() => setIsSelected(!isSelected)}
      >
      <Box sx={{
        width: {xs: "62px", md: "78px"},
        height: {xs: "62px", md: "78px"},
        borderRadius: "50%",
        backgroundColor: "background.default",
        position: "relative",
        left: {xs: isSelected ? "10px" : "60px", md: isSelected ? "12px" : "80px"},
        boxShadow: `
          3px 4px 4px rgba(0,0,0,0.45),
          0px 0px 2px rgba(0,0,0,0.42),
          -2px -2px 5px rgba(225,234,255,0.23),

          inset 0.2px 0.2px 1px rgba(241,246,255,0.25),
          inset 0px -2px 4px rgba(183,208,255,0.35),
          inset 3px 3px 7px rgba(0,0,0,0.15),
          inset 1px 1px 2px rgba(0,0,0,0.30),
          inset 2px 2px 3px rgba(0,0,0,0.55)
        `,
        transition: "all 0.6s ease-in-out",
      }}
      >
        <img
          src={icon}
          alt="icon"
          style={{
            width: isMobile ? "40px" : "54px",
            height: isMobile ? "40px" : "54px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    </Box>
  )
};