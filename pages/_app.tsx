import "@/styles/globals.css";

import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import Layout from "@/components/Layout";
import Splash from "@/components/Splash";

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Bottom from "@/components/bottom/Bottom";
import EditModal from "@/components/modals/EditModal";
import TweetModal from "@/components/modals/TweetModal";

import useCurrentUser from "@/hooks/useCurrentUser";
import { title } from "process";

export default function App({ Component, pageProps }: AppProps) {
  const [animationParent] = useAutoAnimate();
  const { data: isLoggedIn } = useCurrentUser();
  const [pageTitle, setPageTitle] = useState<String>("");

  const user = pageProps.user;
  const name = user?.name;

  useEffect(() => {
    const getLocationPath = () => {
      return window.location.pathname.substring(1);
    };

    const locationPath = getLocationPath().split("/")[0];
    const usersPath = getLocationPath().split("/")[1];

    let title =
      locationPath.charAt(0).toUpperCase() + locationPath.slice(1) || "Home";

    if (locationPath === "users") {
      // TODO: pulled from backend
      title = usersPath;
    }

    setPageTitle(title);
  }, []);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <link
            rel="shortcut icon"
            href="https://abs.twimg.com/favicons/twitter.3.ico"
            type="image/x-icon"
          />
          <title>{pageTitle ? `${pageTitle} / Aichats ` : "Aichats"}</title>
          <meta
            name="description"
            content="This is a Aichat app where you can share the updates about ai tech in it"
          />
        </Head>
        <main ref={animationParent}>
          <div id="portal" />
          <Toaster toastOptions={{ duration: 2000, position: "top-right" }} />
          <Splash />
          <EditModal />
          <LoginModal />
          <RegisterModal />
          <TweetModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* {!isLoggedIn && <Bottom />} */}
        </main>
      </SessionProvider>
      <Analytics />
    </>
  );
}
