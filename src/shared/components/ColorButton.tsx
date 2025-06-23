// src/shared/components/ColorButton.jsx
import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { greyColor, primaryColor, terciaryColor } from "@/theme/theme";


type ColorButtonProps = {
  type: "greenButton" | "blueButton";
  onClick: () => void;
  text: string;
  fetchingText: string;
  isFetching: boolean;
  disabled: boolean;
  sx: object;
};

export const ColorButton: React.FC<ColorButtonProps> = ({
  type = "greenButton", //lightGreenButton, greenButton, yellowButton, brownButton
  onClick = () => {},
  text = "",
  fetchingText = "",
  isFetching = false,
  disabled = false,
  sx = {},
}) => {
  return (
    <Button
    onClick={onClick}
    disabled={disabled || isFetching}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      height: "40px",
      width: "200px",
      borderRadius: "40px",
      background: `linear-gradient(to bottom, ${type === "greenButton" ? primaryColor[100] : terciaryColor[100]}, ${type === "greenButton" ? primaryColor[200] : terciaryColor[200]})`,
      boxShadow: `
      inset 0 0 0 4px transparent,
      inset 0 0 0 4px transparent,
      inset 0 0 0 4px ${primaryColor[200]}
    `,
      '& > span': {
        backgroundImage: `linear-gradient(to right, ${greyColor[900]}, ${greyColor[950]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      "&:hover": {
        background: `linear-gradient(to bottom, ${type === "greenButton" ? primaryColor[200] : terciaryColor[200]}, ${type === "greenButton" ? primaryColor[300] : terciaryColor[300]})`,
      },
      // Aplicamos los gradientes del stroke usando pseudo-elementos
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "40px",
        padding: "4px",
        background: `
          linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.35) 61%,
            rgba(0, 0, 0, 0) 100%
          ),
          linear-gradient(to bottom,
            rgba(255, 255, 255, 0.5) 0%, 
            rgba(255, 255, 255, 0) 100%
          ),
          ${type === "greenButton" ? primaryColor[200] : terciaryColor[200]}
        `,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      },
      ...sx,
    }}
  >
      <span>{isFetching && fetchingText ? fetchingText : text }</span>
      {isFetching && <CircularProgress size={20} sx={{ color: greyColor[950] }} />}
    </Button>
  );
};
