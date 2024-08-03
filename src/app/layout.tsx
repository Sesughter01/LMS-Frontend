import { Providers } from "@/store/provider";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import Head from "next/head";
import { AuthProvider } from "../../context/AuthContext";
import { CohortDataProvider } from "../../context/CohortDataContext";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Ingryd | Landing Page",
  description: "Landing Page for Ingryd Web Application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-7K7DSS8GY6" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-7K7DSS8GY6');
        `}
      </Script>
      <body className={inter.className}>
        <div id="__next">
          <Providers>
            <ThemeContextProvider>
              <AuthProvider>
                <CohortDataProvider>
                  <>
                    {children}

                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                    {/* Same as */}
                    <ToastContainer />
                  </>
                </CohortDataProvider>
              </AuthProvider>
            </ThemeContextProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
