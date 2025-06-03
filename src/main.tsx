// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: "warn",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

enableMocking()
  .then(() => {
    console.log("MSW initialized successfully");
    const rootElement = document.getElementById("root");
    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch((error) => {
    console.error("Failed to initialize MSW:", error);
  });
