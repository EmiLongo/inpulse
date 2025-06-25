// src/modules/home/components/Contact.tsx
import React from "react";
import { Box, Container } from "@mui/material";
import { Text2, Title2 } from "@/theme/textStyles";
import { ContactForm } from "./ContactForm";
import { contactInfo, IContactInfo } from "@/shared/Layout/components/Footer";
import { toast } from "react-toastify";
import { SectionSubTitle, SectionTitle } from "@/theme/textStyles";

export const Contact: React.FC = () => {

  const handleClick = (item: IContactInfo): void => {
    if (item.url === "") {
      navigator.clipboard
        .writeText(item.text)
        .then(() => {
          toast.success(
            `${
              item.type === "phone" ? item.title : item.type
            } copiado al portapapeles`
          );
        })
        .catch((err) => {
          toast.error("Error copiando al portapapeles:", err);
        });
    } else {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        paddingBottom: { xs: "4rem", xl: "5rem" },
        color: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SectionTitle id="contact-title" sx={{ color: "inherit" }}>
        Contacto
      </SectionTitle>
      <SectionSubTitle sx={{ color: "inherit" }}>
        ¿Tienes alguna pregunta específica? Contáctanos, estamos para ayudarte.
      </SectionSubTitle>
      <Container
        sx={{
          display: "flex",
          alignItems: {xs: "center", md: "unset"},
          justifyContent: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100vw",
          maxWidth: "1280px",
          overflow: "hidden",
          gap: { xs: "4rem", xl: "5rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "unset", md: "40vw" },
            width: { xs: "min(85vw, 400px)", md: "40vw" },
            // height: { xs: "unset", md: "100%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Title2 sx={{ marginBottom: "1rem", color: "inherit" }}>
              Información de Contacto
            </Title2>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                {contactInfo.map((item, index) => {
                  if (item.type !== "phone") return null;
                  return (
                    <Box
                      key={`text-${item.type}-${index}`}
                      sx={{
                        // width: {xs: "unset", sm: "45%", md:"unset"},
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        gap: {xs:"0.2rem",},
                        flexWrap: "wrap",
                      }}
                    >
                      <Text2
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontWeight: 600,
                          color: "inherit",
                        }}
                      >
                        {item.title}
                      </Text2>
                      {item.url !== "" ? (
                        <Box
                          component="a"
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleClick(item)}
                        >
                          <Text2 sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit" }}>
                            {item.icon}
                            {item.text}
                          </Text2>
                        </Box>
                      ) : (
                        <Box
                          component="span"
                          onClick={() => handleClick(item)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Text2 sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit" }}>
                            {item.icon}
                            {item.text}
                          </Text2>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
              {contactInfo.map((item, index) => {
                if (item.type === "phone") return null;
                return (
                  <Text2
                    key={`text-${item.type}-${index}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClick(item)}
                  >
                    {item.icon}
                    {item.text}
                  </Text2>
                );
              })}
            </Box>
          </Box>
        </Box>
        <ContactForm
          sx={{
            maxWidth: { xs: "unset", md: "40vw" },
            width: { xs: "min(85vw, 400px)", md: "40vw" },
          }}
        />
      </Container>
    </Box>
  );
};
