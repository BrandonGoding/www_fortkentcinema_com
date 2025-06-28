// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-S2PR27SWGD"); // Replace with your actual ID
};

export const trackPageview = (path) => {
    ReactGA.send({hitType: "pageview", page: path});
};
