import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SectorProvider } from "./context/SectorContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SectorProvider>
      <App />
    </SectorProvider>
  </React.StrictMode>
);