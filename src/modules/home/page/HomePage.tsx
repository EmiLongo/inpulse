// src/modules/home/page/HomePage.tsx
import React from "react";
import { Hero } from "../components/Hero";
import { WhatWeDo } from "../components/WhatWeDo";
import { ContactForm } from "../components/ContactForm";
import { AboutUs } from "../components/AboutUs";
import { Portfolio } from "../components/Portfolio";

export const HomePage: React.FC = () => {
 
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Portfolio />
      <AboutUs />
      <ContactForm />
    </>
  );
};