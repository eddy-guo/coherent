import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import * as cohere_functions from '../scripts/cohere_functions.js';
import React, { useState, useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const support = () => { }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Co:herent</title>
        <link rel="icon" href="/images/coherent-favicon.png" />
        {/* Meta Tags */}
        {/* Primary */}
        <meta
          name="title"
          content="Co:herent - making conversation accessible to all"
        />
        <meta
          name="description"
          content="Digital service that brings accessibility to everyday communcation."
        />
        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.coherentapp.tech/" />
        <meta
          property="og:title"
          content="Co:herent - making conversation accessible to all"
        />
        <meta
          property="og:description"
          content="Digital service that brings accessibility to everyday communcation."
        />
        <meta property="og:image" content="https://www.coherentapp.tech//meta-img.png" />
        {/* Twitter */}
        <meta property="twitter:card" content="https://www.coherentapp.tech//meta-img.png" />
        <meta property="twitter:url" content="https://www.coherentapp.tech/" />
        <meta
          property="twitter:title"
          content="Co:herent - making conversation accessible to all"
        />
        <meta
          property="twitter:description"
          content="Digital service that brings accessibility to everyday communcation."
        />
        <meta
          property="twitter:image"
          content="https://www.coherentapp.tech//meta-img.png"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Co:herent</h1>
          <div>
            <Image
              src="/images/logo-no-background.png"
              alt="logo"
              width="100"
              height="100"
            />
          </div>
        </div>
        <div>
          <Link href="/main">Continue</Link>
        </div>
      </main>
    </div>
  );
}
