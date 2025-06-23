import { Box, CircularProgress } from "@mui/material";
import logo from "@img/inpulse_design_logo_isotipo.svg";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
				gap: "2rem",
				backgroundColor: "background.default",
      }}
    >
			<CircularProgress />
      <img src={logo} alt="Logo Inpulse Design" width={200} />
    </Box>
  );
};

export default Loading;