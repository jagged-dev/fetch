/** @type {import("prettier").Options} */

module.exports = {
  printWidth: 320,
  overrides: [
    {
      files: ["*.html", "src/**/*.tsx"],
      options: {
        tabWidth: 4,
      },
    },
  ],
  plugins: ["prettier-plugin-tailwindcss"],
};
