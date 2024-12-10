import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto",
});
