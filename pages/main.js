import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Main.module.css";
import ChatBoxes from "./chatboxes";

const testing_chat_msgs = [{
  style: styles.leftmessage,
  content: "This is a test message."
},{
  style: styles.rightmessage,
  content: "This is a second test message."

},{
  style: styles.leftmessage,
  content: "This is a third test message."

},{
  style: styles.rightmessage,
  content: "This is a fourth test message."

}];

export default function Main() {
  return (
    <main className={styles.main}>
      <Head>
      <title>Co:herent - Main</title>
      </Head>
      <h1 className={styles.header}>Co:herent</h1>
      <ChatBoxes chat_messages={testing_chat_msgs} />
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
