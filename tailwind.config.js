/** @type {import("tailwindcss").Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        colors: {
            current: "currentColor",
            transparent: "transparent",
            white: "#ffffff",
            black: "#000000",
            red: "#eb0028",
            orange: "#fe4c20",
            yellow: "#fffc05",
            green: "#1ed760",
            blue: "#1877f2",
            purple: "#9049fc",
            snow: "#f2f2f2",
            ice: "#ededed",
            silver: "#cccccc",
            gunmetal: "#666666",
            charcoal: "#1a1a1a",
            coal: "#0a0a0a",
        },
        fontSize: {
            xs: "0.5rem",
            sm: "0.75rem",
            md: "0.875rem",
            base: "1rem",
            lg: "1.25rem",
            xl: "1.5rem",
            "2xl": "2rem",
            "3xl": "3rem",
            "4xl": "4rem",
            "5xl": "5rem",
            "6xl": "6rem",
            "7xl": "7rem",
            "8xl": "8rem",
            "9xl": "9rem",
            "10xl": "10rem",
        },
        container: {
            center: true,
        },
        extend: {
            screens: {
                xs: "500px",
                "3xl": "1800px",
            },
            spacing: {
                18: "4.5rem",
                22: "5.5rem",
            },
            height: {
                "screen/2": "50vh",
            },
            aspectRatio: {
                "5/4": "5/4",
            },
            backgroundImage: {},
            transitionProperty: {
                DEFAULT: "background-image, height, font-size, " + defaultTheme.transitionProperty.DEFAULT,
                background: "background-image, background-color",
                font: "font-size, color",
            },
        },
    },
    darkMode: "selector",
    plugins: [],
};
