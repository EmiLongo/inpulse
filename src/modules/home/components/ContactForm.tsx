// src/modules/home/components/ContactForm.tsx
import React, { useRef } from "react";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputError, Text1, Text3, TextBody6 } from "@/theme/textStyles";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { publicKey, serviceId, templateId } from "@/shared/utils/emailJS";
import { ColorButton } from "@/shared/components/ColorButton";
import { errorColor } from "@/theme/theme";
import { useTranslate } from "@/shared/utils/translate";
import ulie from "@img/ulie.png";

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  email: Yup.string().email("Correo inválido").required("Requerido"),
  phone: Yup.string().required("Requerido"),
  company: Yup.string(),
  message: Yup.string().required("Por favor, escriba un mensaje"),
});

interface ContactFormProps {
  sx?: object;
}

export const ContactForm: React.FC<ContactFormProps> = ({ sx = {} }) => {
  const { t } = useTranslate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const formRef = useRef<HTMLFormElement>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      emailjs
        .sendForm(serviceId, templateId, formRef.current, publicKey)
        .then(() => {
          toast.success(t.contact.formSuccess);
          resetForm();
        })
        .catch(() => {
          toast.error(t.contact.formError);
          console.log("Error al enviar el mensaje", values);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Box
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "90%", md: "800px" },
        borderRadius: { xs: "24px", md: "60px" },
        backgroundColor: "background.default",
        padding: { xs: "1rem", md: "48px 60px" },
        marginX: "auto",
        gap: "24px",
        position: "relative",
        ...sx,
      }}
    >
      <Box id="contact" sx={{position: "relative", top: {xs: "-8rem", md: "-11rem"}}}></Box>
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src={ulie} alt="ulie" style={{ width: "100px", transform: "scaleX(-1)" }} />
          <Box>
            <TextBody6>{t.contact.subtitle}</TextBody6>
            <Text3 sx={{ textWrap: "balance", lineHeight: "1.7" }}>{t.contact.title}</Text3>
          </Box>
        </Box>
      ) : (
        <Text1>{t.contact.title}</Text1>
      )}
      <Box sx={{ 
        width: "100%", 
        display: "flex", 
        flexDirection: {xs: "column", md: "row"},
        justifyContent: "center",
        gap: "2rem",
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
          {!isMobile && <>
          <img src={ulie} alt="ulie" style={{ width: "160px", transform: "scaleX(-1)" }} />
          <TextBody6>{t.contact.subtitle}</TextBody6></>
          }
        </Box>
        <Box
          id="contact-form"
          ref={formRef}
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label={t.contact.formNameLabel}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            // helperText={formik.touched.name && formik.errors.name}
            sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
          />
          <InputError
            sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}
          >
            {formik.touched.name && formik.errors.name}
          </InputError>
          <TextField
            fullWidth
            label={t.contact.formEmailLabel}
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
          />
          <InputError
            sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}
          >
            {formik.touched.email && formik.errors.email}
          </InputError>
          <TextField
            fullWidth
            label={t.contact.formPhoneLabel}
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
          />
          <InputError
            sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}
          >
            {formik.touched.phone && formik.errors.phone}
          </InputError>
          <TextField
            fullWidth
            label={t.contact.formMessageLabel}
            multiline
            rows={6}
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
          />
          <InputError
            sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}
          >
            {formik.touched.message && formik.errors.message}
          </InputError>
          <ColorButton
            id="bt-home-submit"
            type="greenButton"
            fetchingText={t.contact.formSubmitting}
            isFetching={formik.isSubmitting}
            disabled={formik.isSubmitting}
            sx={{width: {xs: "250px", md: "300px"}}}
            text={t.contact.formSubmit}
            onClick={() => formik.handleSubmit()}
          />
        </Box>
      </Box>
    </Box>
  );
};
