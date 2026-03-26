import React from "react";
import {
  Box,
  ListItem,
  Container,
  Link,
  useTheme,
  Divider,
  styled,
} from "@mui/material";
import WhatsApp from "@mui/icons-material/WhatsApp";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import inpulseLogo from "@img/inpulse_design_logo_blanco.svg";
import logoContraste from "@img/inpulse_design_logo_blanco_color.svg";
import {
  Caption,
  TextBody5,
  Title4
} from "@/theme/textStyles";
import { toast } from "react-toastify";
import { useTranslate } from "@shared/utils/translate";
import { getInfoItems, glassEffect } from "./Header";
import { greyColor, primaryColor } from "@theme/theme";
import { TikTokIcon } from "@shared/components/TikTokIcon";

export interface IContactInfo {
  icon: React.ReactNode;
  text: string;
  type: string;
  url: string;
}

export const contactInfo : IContactInfo[] = [
  { icon: <WhatsApp sx={{ fontSize: "1.5rem" }}/>, 
    text: "Emi: 341 266-7096", 
    type: "phone",
    url: "https://wa.me/5493412667096?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20InPulse%20Design."
  },
  { icon: <WhatsApp sx={{ fontSize: "1.5rem"}}/>, 
    text: "Nati: 11 6896-2233", 
    type: "phone",
    url: "https://wa.me/5491168962233?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20InPulse%20Design.",
  },
  { icon: <MailOutlineOutlinedIcon sx={{ fontSize: "1.5rem" }}/>, 
    text: "inpulsedesign.info@gmail.com", 
    type: "Email",
    url: "mailto:inpulsedesign.info@gmail.com",
  }
]
export const contactSocial : IContactInfo[] = [
  {
    icon: <LinkedInIcon sx={{ fontSize: "1.5rem"}}/>,
    text: "Linkedin",
    type: "Linkedin",
    url: "https://www.linkedin.com/in/inpulsedesign/",
  },
  {
    icon: <InstagramIcon sx={{ fontSize: "1.5rem" }}/>,
    text: "@inpulse_design",
    type: "Instagram",
    url: "https://www.instagram.com/inpulse_design/",
  },
  {
    icon: <TikTokIcon />,
    text: "@inpulse.design",
    type: "Tiktok",
    url: "https://www.tiktok.com/@inpulse.design",
  },
];
export const Footer: React.FC = () => {
  const theme = useTheme();
  const { palette } = theme;
  const { t } = useTranslate();
  const infoItems = getInfoItems(t);

  const FooterListItem = styled(ListItem)(({ theme }) => ({
    flex: 1,
    margin: 0,
    padding: "0.1rem 0",
    textWrap: "nowrap",
    [theme.breakpoints.up('md')]: {
      paddingRight: "1rem",
    },
  }));

  const FooterLink = styled(Link)({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: greyColor[400],
    "&:hover": {
      color: primaryColor[400],
    },
  });

  // Función para compartir URL
  const shareURL = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Inpulse Design",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("¡URL copiada al portapapeles!"))
        .catch(() => toast.error("No se pudo copiar la URL"));
    }
  };

  return (
    <Box component="footer" id="footer" 
    sx={{ 
      paddingX: {xs: "1rem", md: "2rem", lg: "unset"},
      paddingTop: "2rem",
      paddingBottom: "1rem",
      color: palette.primary.light,
      maxWidth: "1280px",
      width: {xs: "90%", lg: "100%"},
      margin: "2rem auto",
      borderRadius: "2rem",
      ...glassEffect
    }}
    >
      <Container maxWidth="lg">
        <Box
          id="footerContainer"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: { xs: 4, md: "64px" },
          }}
        >
          {/* columna de la izquierda */}
          <Box
            id="footerLeft"
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box
                component={"img"}
                src={logoContraste}
                alt="Inpulse Design Blanco y Negro"
                decoding="async"
                loading="lazy"
                sx={{
                  width: "216px",
                }}
              />
              <Box
                id="shareURL"
                onClick={shareURL}
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  color: greyColor[50],
                  "&:hover": {
                    color: primaryColor[400],
                  },
                }}
              >
                <ShareOutlinedIcon
                  width={16}
                  height={16}
                  sx={{ verticalAlign: "middle", marginRight: 1 }}
                />
                <Caption sx={{ fontWeight: 300 }}>
                  {t.footer.share}
                </Caption>
              </Box>
            </Box>
          </Box>
          
          {/* columna del centro */}
          <Box id="footerCenter" sx={{ display: "flex", flexDirection: "column", color: greyColor[50]}}>
            <Title4 sx={{ color: greyColor[50], textAlign: {xs: "center", md: "left"}}}>{t.footer.centerTitle}</Title4>
            <Box>
              {contactInfo.map((item) => (
                <FooterListItem
                  key={item.text.replace(" ", "-")}
                  id={`footerListItem-${item.text.replace(" ", "-")}`}
                >
                  <FooterLink href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.icon} <TextBody5 sx={{ color: "inherit", textAlign: "center" }}>{item.text}</TextBody5>
                  </FooterLink>
                </FooterListItem>
              ))}
            </Box>
            <Box sx={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: {xs: "center", md: "flex-start"}, color: greyColor[400], gap: {xs: "2rem", md: "1rem"} }}>
              {contactSocial.map((item) => (
                <Box
                  key={item.text.replace(" ", "-")}
                  id={`footerListItem-${item.text.replace(" ", "-")}`}
                >
                  <FooterLink href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                  </FooterLink>
                </Box>
              ))}
            </Box>
          </Box>

          {/* columna de la derecha */}
          {/* <Box id="footerRight" sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Title4 sx={{ color: greyColor[50], textAlign: "center",  }}>{t.footer.rightTitle}</Title4>
              <Box sx={{ display: "flex", flexDirection: {xs: "row", md: "column"}, justifyContent: "center", flexWrap: "wrap", columnGap: {xs: "2rem", md: 0}}}>
                <FooterListItem id="footerListItem-home">
                  <FooterLink href="#hero">
                    <TextBody5 sx={{ color: "inherit" }}>Home</TextBody5>
                  </FooterLink>
                </FooterListItem>
                {infoItems.map((item) => (
                  <FooterListItem
                    key={item.text.replace(" ", "-")}
                    id={`footerListItem-${item.text.replace(" ", "-")}`}
                  >
                    <FooterLink href={item.path}>
                      <TextBody5 sx={{ color: "inherit", textAlign: "center" }}>{item.text}</TextBody5>
                    </FooterLink>
                  </FooterListItem>
                ))}
            </Box>
          </Box> */}
          <Box id="footerRight" sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Title4 sx={{ color: greyColor[50], textAlign: "center",  }}>{t.footer.rightTitle}</Title4>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <FooterListItem id="footerListItem-home">
                  <FooterLink href="#hero">
                    <TextBody5 sx={{ color: "inherit" }}>Home</TextBody5>
                  </FooterLink>
                </FooterListItem>
                {infoItems.map((item) => (
                  <FooterListItem
                    key={item.text.replace(" ", "-")}
                    id={`footerListItem-${item.text.replace(" ", "-")}`}
                  >
                    <FooterLink href={item.path}>
                      <TextBody5 sx={{ color: "inherit", textAlign: "center" }}>{item.text}</TextBody5>
                    </FooterLink>
                  </FooterListItem>
                ))}
            </Box>
          </Box>
        </Box>
        <Divider
        component="hr"
        variant="fullWidth"
        aria-hidden="true"
        sx={{ 
          marginTop: "2rem", 
          marginBottom: "1rem", 
          backgroundColor: primaryColor[100] 
        }} 
        />
        <Box
          id="footerBottom"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            color: greyColor[50],
          }}
        >
          <Caption sx={{ color: "inherit",textAlign: "center" }}>
            {new Date().getFullYear()} {t.footer.allRights}
          </Caption>
          <Box
            component={"a"}
            href="#hero"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Box
              component={"img"}
              src={inpulseLogo}
              alt="Logo Inpulse Design"
              width={100}
              decoding="async"
              loading="lazy"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
