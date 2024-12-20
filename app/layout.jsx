import "@styles/globals.css";

// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.4 where link clicks that switch
// the locale would otherwise cause a full reload.

export default function RootLayout({ children }) {
  console.log("API_URL:", process.env.API_URL);
  console.log("API_BASE_URL:", process.env.API_BASE_URL);
  return children;
}
