import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Main.module.css";

export default function Main() {
  return (
    <main className={styles.main}>
      <Head>
      <title>Co:herent - Main</title>
      </Head>
      <h1 className={styles.header}>Co:herent</h1>
      <div className={styles.messages}>
      {/* this should populate on its own when messages are sent (left, right, then left etc) */}
      <div className={styles.leftmessage}><p className={styles.lefttext}>temporary message</p></div>
      <div className={styles.rightmessage}><p className={styles.righttext}>temporary message</p></div>
      <div className={styles.leftmessage}><p className={styles.lefttext}>temporary message</p></div>
      <div className={styles.rightmessage}><p className={styles.righttext}>temporary message</p></div>
      <div className={styles.leftmessage}><p className={styles.lefttext}>temporary message</p></div>
      <div className={styles.rightmessage}><p className={styles.righttext}>temporary message</p></div>
      <div className={styles.leftmessage}><p className={styles.lefttext}>temporary message</p></div>
      <div className={styles.rightmessage}><p className={styles.righttext}>temporary message</p></div>
      </div>
      <div className={styles.inputarea}>
        <input
          className={styles.input}
          type="text"
          id="input"
          name="input-text"
          placeholder="Input your text here"
        />
        <input className={styles.button} type="image" src="/images/microphone.svg" />
      </div>
    </main>
  );
}
