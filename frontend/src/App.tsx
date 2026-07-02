import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { LOCClassificationResult } from "./features/loc-classificaiton/components/loc-classification-result";

function App() {
  return (
    <>
      <LOCClassificationResult />
    </>
  );
}

export default App;
