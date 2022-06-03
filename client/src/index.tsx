import { createRoot } from "react-dom/client";
import {} from "mobx-react-lite";

import StoreProvider from "./services/contexts/StoreContext";

import "./assets/styles/index.css";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
