import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Bricolage_Grotesque } from "next/font/google";
import { bricolageGrotesque } from "../theme/fonts";
// CONTEXTS
import { ThemeProvider } from "../theme/ThemeProvider";
import { RandColorProvider } from "../context/RandColorContext";
import { UserProvider } from "../context/UserContext";
// TOAST
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
// export const bricolageGrotesque = Bricolage_Grotesque({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

export const metadata: Metadata = {
  title: "Sign Up | Create Your Account",
  description: "Create a new account to get started",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolageGrotesque.className}>
      <body>
        <ThemeProvider>
          <RandColorProvider>
            <UserProvider>
              {children}
              <ToastContainer position="top-center" autoClose={5000} />
            </UserProvider>
          </RandColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
