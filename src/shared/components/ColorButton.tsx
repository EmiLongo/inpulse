// src/shared/components/ColorButton.jsx
import React from "react";
import { Button, CircularProgress, useTheme } from "@mui/material";


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
  const theme = useTheme();
  const { palette } = theme;
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
      background: `linear-gradient(to bottom, ${type === "greenButton" ? palette.primary[100] : palette.info[100]}, ${type === "greenButton" ? palette.primary[200] : palette.info[200]})`,
      boxShadow: `
      inset 0 0 0 4px transparent,
      inset 0 0 0 4px transparent,
      inset 0 0 0 4px ${palette.primary[200]}
    `,
      '& > span': {
        backgroundImage: `linear-gradient(to right, ${palette.grey[900]}, ${(palette.grey as any)[950]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      "&:hover": {
        background: `linear-gradient(to bottom, ${type === "greenButton" ? palette.primary[200] : palette.info[200]}, ${type === "greenButton" ? palette.primary[300] : palette.info[300]})`,
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
          ${type === "greenButton" ? palette.primary[200] : palette.info[200]}
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
      {isFetching && <CircularProgress size={20} sx={{ color: palette.grey[950] }} />}
    </Button>
  );
};
