import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";

/* Portfolio / CV page, served at /cv/. The start page (/) is the freelance site (src/freelance.jsx). */
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
