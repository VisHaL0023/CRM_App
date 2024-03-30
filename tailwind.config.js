/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
      btnColor: "#9d174d",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"],
  },
});
