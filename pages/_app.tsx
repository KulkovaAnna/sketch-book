import React from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const ThemeLayout = dynamic(
  () => import('layouts').then((mod) => mod.ThemeLayout),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeLayout>
      <Head>
        <title>Dear Diary</title>
      </Head>
      <Component {...pageProps} />
    </ThemeLayout>
  );
}

export default MyApp;
