import "./globals.css";

export const metadata = {
  title: "EntuLife",
  description: "Discover your place in the timeline of life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}