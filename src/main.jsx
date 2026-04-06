import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";
import FullRoadmap from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FullRoadmap />
  </StrictMode>
);
