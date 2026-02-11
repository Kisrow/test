import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";
import App from "./App.tsx";
import { UIProvider } from "./app/UIProvider.tsx";
import { QueryProvider } from "./app/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <UIProvider>
          <App />
        </UIProvider>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
);
