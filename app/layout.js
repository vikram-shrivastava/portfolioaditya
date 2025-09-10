// app/layout.js
import "./globals.css";
import { Spline_Sans, Noto_Sans } from "next/font/google";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata = {
  title: "Aditya Shrivastav - UI/UX Designer",
  description: "Portfolio website of UI/UX Designer Aditya Shrivastav",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#111814] ${splineSans.className} ${notoSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
