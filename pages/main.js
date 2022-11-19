import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Main.module.css";
import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition, } from "react-speech-recognition";

export default function Main() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const support = () => {};
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser does not support speech recognition.</span>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className={styles.main}>
      <Head>
        <title>Co:herent - Main</title>
      </Head>
      <div className={styles.inputarea}>
        <input
          className={styles.input}
          type="text"
          id="input"
          name="input-text"
          placeholder="Insert text here"
          defaultValue={transcript}
        />
        <input
          className={styles.button}
          type="image"
          src="/images/microphone.svg"
          onClick={SpeechRecognition.startListening}
        />
      </div>
    </main>
  );
}
