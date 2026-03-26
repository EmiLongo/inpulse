// src/modules/home/page/HomePage.tsx
import React from "react";
import { Hero } from "../components/Hero";
import { WhatWeDo } from "../components/WhatWeDo";
import { ContactForm } from "../components/ContactForm";

export const HomePage: React.FC = () => {
 
  return (
    <>
      <Hero />
      <WhatWeDo />
      <ContactForm />
    </>
  );
};