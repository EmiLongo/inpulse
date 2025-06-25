// src/modules/home/page/HomePage.tsx
import React from "react";
import { Hero } from "../components/Hero";
import { DinoGame } from "../components/DinoGame";

export const HomePage: React.FC = () => {
 
  return (
    <>
      <Hero />
      <DinoGame />
    </>
  );
};