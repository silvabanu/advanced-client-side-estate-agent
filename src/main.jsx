// React strict mode
import { StrictMode } from "react";

// React DOM renderer
import { createRoot } from "react-dom/client";

// Main app component
import App from "./App.jsx";

// Global styles
import "./styles/global.css";

// Render app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);