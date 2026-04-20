// src/shared/Layout/components/WhatsApp.tsx
import { greyColor, primaryColor } from '@/theme/theme';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Fab } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const WhatsApp: React.FC = () => {
  const [bottomOffset, setBottomOffset] = useState(32); // en px, equivale a 2rem
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      const icon = iconRef.current;
      if (!footer || !icon) return;

      const footerRect = footer.getBoundingClientRect();
      // const iconHeight = icon.offsetHeight;

      const viewportHeight = window.innerHeight;
      const distanceToBottom = viewportHeight - footerRect.top;

      if (distanceToBottom > 0) {
        // Se está solapando, ajustar hacia arriba
        setBottomOffset(distanceToBottom + 32); // 32px extra como margen
      } else {
        setBottomOffset(32); // posición normal
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // para manejar cambios de altura
    handleScroll(); // inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  return (
    <Box 
    id="whatsapp"
    ref={iconRef}
    component={"a"}
    href="https://wa.me/5493476619576?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Talleres%20Montreal."
    target="_blank"
    rel="noopener noreferrer"
    sx={{ 
      position: "fixed", 
      bottom: `${bottomOffset}px`,
      // bottom: {xs: "1rem", md: "2rem", lg: "3rem"},
      right: {xs: "1rem", md: "2rem", lg: "3rem"}, 
      zIndex: 100           
    }}
    >
      <Fab aria-label="whatsapp"
        sx={{ 
          width: { xs: "4rem", md: "5rem", lg: "6rem" },
          height: { xs: "4rem", md: "5rem", lg: "6rem" },
          padding: "1rem",
          backgroundColor: primaryColor[600], 
          color: primaryColor[900], 
          
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(to bottom, ${primaryColor[100]}, ${primaryColor[200]})`,
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
            background: `linear-gradient(to bottom, ${primaryColor[200]}, ${primaryColor[300]})`,
          },
          // Aplicamos los gradientes del stroke usando pseudo-elementos
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
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
              ${primaryColor[200]}
            `,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: "2.2rem", md: "2.5rem", lg: "3rem" } }}/>
      </Fab>
    </Box>
  )
}