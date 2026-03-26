// src/modules/home/page/HomePage.tsx
import React from "react";
import { Hero } from "../components/Hero";
import { WhatWeDo } from "../components/WhatWeDo";
import { Contact } from "../components/Contact";

export const HomePage: React.FC = () => {
 
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Contact />
    </>
  );
};