import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { navy: "#101D3A", orange: "#FF7629", cream: "#FFF8F3" },
    boxShadow: { soft: "0 12px 40px rgba(16,29,58,.08)" }
  }},
  plugins: []
};
export default config;
