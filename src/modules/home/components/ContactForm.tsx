// src/modules/home/components/ContactForm.tsx
import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputError } from '@/theme/textStyles';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { publicKey, serviceId, templateId } from '@/shared/utils/emailJS';
import { ColorButton } from '@/shared/components/ColorButton';
import { errorColor } from '@/theme/theme';

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  phone: Yup.string().required('Requerido'),
  company: Yup.string(),
  message: Yup.string().required('Por favor, escriba un mensaje'),
});

interface ContactFormProps {
  sx?: object;
}

export const ContactForm: React.FC<ContactFormProps> = ({ sx = {} }) => {

  const formRef = useRef<HTMLFormElement>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      emailjs
        .sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey,
        )
        .then(() => {
          toast.success('Mensaje enviado con éxito')
          resetForm();
        })
        .catch(() => {
          toast.error('Error al enviar el mensaje')
          console.log('Error al enviar el mensaje', values);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Box 
    sx={{ 
      color: 'white',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between',      
      ...sx , 
    }}
    >
      <Box 
        id="contact-form" 
        ref={formRef}
        component="form" 
        onSubmit={formik.handleSubmit} 
        noValidate
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '100%', 
        }}
      >
        <TextField
          fullWidth
          label="Nombre y Apellido"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          // helperText={formik.touched.name && formik.errors.name}
          sx={{backgroundColor: 'background.paper', borderRadius: 1 }}
        />
        <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
          {formik.touched.name && formik.errors.name}
        </InputError>
        <TextField
          fullWidth
          label="Correo Electrónico"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
        />
        <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
          {formik.touched.email && formik.errors.email}
        </InputError>
        <TextField
          fullWidth
          label="Teléfono"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
        />
        <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
          {formik.touched.phone && formik.errors.phone}
        </InputError>
        <TextField
          fullWidth
          label="Empresa"
          id="company"
          name="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.company && Boolean(formik.errors.company)}
          sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
        />
        <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
          {formik.touched.company && formik.errors.company}
        </InputError>
        <TextField
          fullWidth
          label="Mensaje"
          multiline
          rows={6}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
        />
        <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
          {formik.touched.message && formik.errors.message}
        </InputError>
      </Box>
      <ColorButton
          type="greenButton"
          fetchingText="...enviando"
          isFetching={formik.isSubmitting}
          disabled={formik.isSubmitting}
          sx={{}}
          text="Enviar Mensaje"
          onClick={() => formik.handleSubmit()}
        />
    </Box>
  );
};