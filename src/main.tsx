import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { addResourceHints } from "./lib/performance";

// Add performance optimizations
addResourceHints();

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
