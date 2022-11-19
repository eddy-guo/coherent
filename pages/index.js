import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import * as cohere_functions from '../scripts/cohere_functions.js';
import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function Home() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const support = () => { }
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser does not support speech recognition.</span>;
    }
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
        <meta property="og:url" content="" />
        <meta
          property="og:title"
          content="Co:herent - making conversation accessible to all"
        />
        <meta
          property="og:description"
          content="Digital service that brings accessibility to everyday communcation."
        />
        <meta property="og:image" content="" />
        {/* Twitter */}
        <meta property="twitter:card" content="" />
        <meta property="twitter:url" content="" />
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
          content=""
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
          <button onClick={SpeechRecognition.startListening}>start</button>
          <p style={{ color: 'red' }}>{transcript}</p>
        </div>
      </main>
    </div>
  );
}
