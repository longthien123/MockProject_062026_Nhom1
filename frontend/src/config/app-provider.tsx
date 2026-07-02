import React from "react";
import { BrowserRouter } from "react-router-dom";
type AppProvidersProps = { children: React.ReactNode };

export default function AppProviders(props: AppProvidersProps) {
  return <BrowserRouter>{props.children}</BrowserRouter>;
}
