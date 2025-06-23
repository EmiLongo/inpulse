// src/theme/theme.ts
import { createTheme } from "@mui/material";
import { defaultFonts } from "./textStyles";

// hechas con https://m2.material.io/inline-tools/color/
// el que dice elegido determinó la paleta
export const greyColor = {
  50: "#F9F9F9",
  100: "#F3F3F3",
  200: "#EBEBEB",
  300: "#DBDBDB",
  400: "#B8B8B8",
  500: "#989898",
  600: "#707070",
  700: "#5C5C5C",
  800: "#3D3D3D",
  900: "#1D1D1D",
  950: "#080808",
};

export const primaryColor = {
  50: "#D5F7F4",
  100: "#93E9E1",
  200: "#00DBCC",
  // hasta aca contraste con texto negro
  300: "#00C9B5",
  400: "#00B9A3",
  500: "#00AA90",
  600: "#009C82",
  700: "#008B70",
  800: "#007B61",
  // a partir de aca contraste con texto blanco
  900: "#005D42",
  950: "#003D2B",
};

export const secondaryColor = {
  50: "#FCE7F8",
	100: "#F6C3ED",
	200: "#F199E3",
	300: "#EA6CD7",
	// hasta aca contraste con texto negro
	400: "#E343CD",
	500: "#D913C3",
	600: "#C90DBD",
	700: "#B502B6",
	800: "#A400B0",
	// a partir de aca contraste con texto blanco
	900: "#8400A4",
  950: "#64007D",
};

export const terciaryColor = {
  50: "#ECEDFF",
	100: "#CED1FF",
	200: "#ADB3FF",
	300: "#8A94FF",
	// hasta aca contraste con texto negro
	400: "#6F79FD",
	500: "#5B5EF3",
	600: "#5555E7",
	700: "#4C49D9",
	// a partir de aca contraste con texto blanco
	800: "#463ECC",
	900: "#3C28B4",
  950: "#31218B",
};

export const accentColor = {
  50: "#E9FEDB",
  100: "#DCFFC5",
  200: "#CDFEAC",
	// hasta aca contraste con texto negro
  300: "#B9F98C",
  400: "#A3E779",
  500: "#8ED06D",
  600: "#7BBB62",
  700: "#58974F",
  800: "#3F6D38",
	// a partir de aca contraste con texto blanco
  900: "#355B2F",
  950: "#294424",
};

export const errorColor = {
  50: "#FFE2EB",
  100: "#FFB7CD",
  200: "#FF86AB",
  // hasta aca contraste con texto negro
  300: "#FF4E89",
  400: "#FF006F",
  500: "#FD0054",
  600: "#EC0053", // elegido
  700: "#D70050",
  800: "#C3004E",
	// a partir de aca contraste con texto blanco
  900: "#9D004B",
  950: "#700036",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor[900],  // Color turquesa
      light: primaryColor[200],
      dark: primaryColor[950],
      50: primaryColor[50],
      100: primaryColor[100],
      200: primaryColor[200],
      300: primaryColor[300],
      400: primaryColor[400],
      500: primaryColor[500],
      600: primaryColor[600],
      700: primaryColor[700],
      800: primaryColor[800],
      900: primaryColor[900],
      950: primaryColor[950],
    },
    secondary: {
      main: secondaryColor[400], // Color violeta
      dark: secondaryColor[600],
      50: secondaryColor[50],
      100: secondaryColor[100],
      200: secondaryColor[200],
      300: secondaryColor[300],
      400: secondaryColor[400],
      500: secondaryColor[500],
      600: secondaryColor[600],
      700: secondaryColor[700],
      800: secondaryColor[800],
      900: secondaryColor[900],
      950: secondaryColor[950],
    },
    info: {
      main: terciaryColor[400], // Color azul (TERTIARY)
      dark: terciaryColor[600],
      50: terciaryColor[50],
      100: terciaryColor[100],
      200: terciaryColor[200],
      300: terciaryColor[300],
      400: terciaryColor[400],
      500: terciaryColor[500],
      600: terciaryColor[600],
      700: terciaryColor[700],
      800: terciaryColor[800],
      900: terciaryColor[900],
      950: terciaryColor[950],
    },
    success: { 
      main: accentColor[400], // Color verde mantis (ACCENT)
      dark: accentColor[600],
      50: accentColor[50],
      100: accentColor[100],
      200: accentColor[200],
      300: accentColor[300],
      400: accentColor[400],
      500: accentColor[500],
      600: accentColor[600],
      700: accentColor[700],
      800: accentColor[800],
      900: accentColor[900],
      950: accentColor[950],
    },
    background: {
      default: greyColor[950],
      paper: greyColor[50],
    },
    text: {
      primary: primaryColor[800],
      secondary: greyColor[950],
      disabled: greyColor[400],
    },
    error: {
      main: errorColor[800], // Color rosa
      light: errorColor[400],
      50: errorColor[50],
      100: errorColor[100],
      200: errorColor[200],
      300: errorColor[300],
      400: errorColor[400],
      500: errorColor[500],
      600: errorColor[600],
      700: errorColor[700],
      800: errorColor[800],
      900: errorColor[900],
      950: errorColor[950],
    },
    grey: {
      50: greyColor[50],
      100: greyColor[100],
      200: greyColor[200],
      300: greyColor[300],
      400: greyColor[400],
      500: greyColor[500],
      600: greyColor[600],
      700: greyColor[700],
      800: greyColor[800],
      900: greyColor[900],
      950: greyColor[950],
    },
  },
  typography: {
    htmlFontSize: 16, // base 1rem = 16px
    fontFamily: defaultFonts.family.textos,
  },
  components: {
    MuiButton: {
      defaultProps: {
        // Establece el estilo predeterminado del botón
        variant: "contained",
        size: "small",
      },
      styleOverrides: {
        // sobreescribe estilos de botones
        root: {
          minHeight: '30px',
          // borderRadius: '4px',
          letterSpacing: defaultFonts.letter.wide,
          width: "fit-content",
          fontFamily: defaultFonts.family.textos,
          fontWeight: 500,
          textTransform: "uppercase",
        },
      },
    },
        MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: defaultFonts.family.textos,
          color: greyColor[950],
          borderRadius: "4px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: greyColor[600],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: greyColor[700],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor[600],
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: errorColor[700],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: defaultFonts.family.textos,
          color: greyColor[800],
          "&.Mui-focused": {
            color: primaryColor[600],
          },
          "&.Mui-error": {
            color: errorColor[700],
          },
        },
      },
    },
  }
});