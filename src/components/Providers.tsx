"use client";

import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { PortfolioProvider } from "../context/PortfolioContext";
import Header from "./Header";
import Footer from "./Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Header />
        {children}
        <Footer/>
      </PortfolioProvider>
    </AuthProvider>
  );
}
