import { useTranslate } from "@/shared/utils/translate";
import { Text1, Text3, TextBody4, TextBody5, TextBody6, Title3 } from "@/theme/textStyles";
import { greyColor } from "@/theme/theme";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MAImg from "@img/portfolio/Hongos.png";
import TMImg from "@img/portfolio/TM.png";
import KImg from "@img/portfolio/Kosten.png";

type Client = {
  name: string;
  desc: string;
  color: string;
  accent: string;
  image: string;
};

const clients: Client[] = [
  { name: "Mundo Adaptógenos",
    desc: "Tienda online de salud integral",
    color: "#1a2a1a",
    accent: "#3a6b3a",
    image: MAImg 
  },
  { name: "Talleres Montreal",
    desc: "Empresa dedicada a fabricar piezas a medida",
    color: "#1a1a2a",
    accent: "#3a3a6b",
    image: TMImg
  },
  { name: "Kosten",
    desc: "Aplicación web de turismo",
    color: "#2a1a1a",
    accent: "#6b3a3a",
    image: KImg
  },
  // { name: "Gastro Delivery", desc: "Plataforma de pedidos online", color: "#1a2a2a", accent: "#3a6b6b" },
  // { name: "Legal Pro", desc: "Estudio jurídico especializado", color: "#2a2a1a", accent: "#6b6b3a" },
];

export const Portfolio: React.FC = () => {
  const { t } = useTranslate();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("xl"));

  const touchStartX = useRef(0);

  // ---------------- Layout ----------------
  const getLayout = (index: number) => {
    const n = clients.length;
    const diff = ((index - current) % n + n) % n;
    const offset = diff > n / 2 ? diff - n : diff;

    if (offset === 0) {
      return {
        scale: 1,
        x: 0,
        z: 10,
        grayscale: false,
        visible: true,
        w: isMobile ? 340 : isDesktop ? 640 : 900,
        h: isMobile ? 300 : isDesktop ? 350 : 500,
      };
    }

    if (offset === 1 || offset === -1) {
      const dir = offset > 0 ? 1 : -1;
      return {
        scale: 0.75,
        x: isMobile ? dir * 200 : isDesktop ? dir * 500 : dir * 750,
        z: 5,
        grayscale: true,
        visible: true,
        w: isMobile ? 240 : isDesktop ? 340 : 640,
        h: isMobile ? 220 : isDesktop ? 300 : 350,
      };
    }

    return { visible: false };
  };

  // ---------------- Autoplay ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrent((prev) => (prev + 1) % clients.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  // ---------------- Swipe ----------------
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        setCurrent((prev) => (prev + 1) % clients.length);
      } else {
        setCurrent((prev) =>
          (prev - 1 + clients.length) % clients.length
        );
      }
    }
  };

  return (
    <Box
      component={"section"}
      sx={{
        width: "100vw",
        backgroundColor: "background.default",
        paddingY: { xs: "3rem", md: "5rem" },
        borderRadius: { xs: "50px", md: "100px" },
        color: greyColor[50],
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box id="portfolio" sx={{ position: "relative", top: { xs: "-8rem", md: "-11rem" } }}></Box>
      {isMobile ? (
        <Text3 sx={{ width: "100%", textAlign: "center", textWrap: "balance", lineHeight: "1.7" }}>{t.clients.title1}</Text3>
      ) : (
        <Text1 sx={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>{t.clients.title1}</Text1>
      )}

      {/* TRACK */}
      <Box
        sx={{
          position: "relative",
          height: isMobile ? 320 : isDesktop ? 420 : 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          overflow: "hidden",

          // 👇 lado izquierdo
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "120px", // ajustable
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to right, #050021 20%, transparent 100%)",
          },

          // 👇 lado derecho
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to left, #050021 20%, transparent 100%)",
          },
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {clients.map((client, i) => {
          const layout = getLayout(i);

          if (!layout.visible) return null;

          return (
            <Box
              key={i}
              onClick={() => {
                if (i !== current) setCurrent(i);
              }}
              sx={{
                position: "absolute",
                width: layout.w,
                height: layout.h,
                transform: `translateX(${layout.x}px) scale(${layout.scale})`,
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                borderRadius: 4,
                overflow: "hidden",
                zIndex: layout.z,
                cursor: "pointer",
                filter: layout.grayscale
                  ? "grayscale(1) brightness(0.5)"
                  : "none",
              }}
            >
              {/* CARD */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, ${client.color}, ${client.accent})`,
                  backgroundImage: `url(${client.image})`,
                  backgroundSize: "cover",
                  position: "relative",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* LABEL */}
                {!layout.grayscale && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      p: 2,
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,1))",
                      color: "#fff",
                    }}
                  >
                    <Title3 fontWeight={600}>
                      {client.name}
                    </Title3>
                    {isMobile
                      ? <TextBody6 sx={{ color: greyColor[200] }}>
                        {client.desc}
                      </TextBody6>
                      : isDesktop
                        ? <TextBody5 sx={{ color: greyColor[200] }}>
                          {client.desc}
                        </TextBody5>
                        : <TextBody4 sx={{ color: greyColor[200] }}>
                          {client.desc}
                        </TextBody4>
                    }
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* DOTS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 3,
        }}
      >
        {clients.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              width: current === i ? 36 : 28,
              height: 5,
              borderRadius: 3,
              background:
                current === i
                  ? "#fff"
                  : "rgba(255,255,255,0.3)",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}