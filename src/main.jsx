import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";
import { onFreelanceHost } from "./site.js";

/* On the freelance domain the start page is the freelance site, everywhere else the portfolio. */
const load = onFreelanceHost() ? import("./FreelanceApp.jsx") : import("./App.jsx");
load.then(({ default: Root }) => createRoot(document.getElementById("root")).render(<React.StrictMode><Root /></React.StrictMode>));
