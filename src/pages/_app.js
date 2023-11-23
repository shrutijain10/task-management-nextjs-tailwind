import React from "react"; // Make sure to import React
import Head from "next/head";
import { StoreProvider } from "../stores/StoreProvider"; // Correct import path
import "@/styles/globals.css";
import { AuthProvider } from "../firebase/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div>
        <Head>
          <title>Task Management</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </div>
      </div>
    </StoreProvider>
  );
}

export default MyApp;
