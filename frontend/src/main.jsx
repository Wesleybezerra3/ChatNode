import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/Contexts.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  // </StrictMode>
);
