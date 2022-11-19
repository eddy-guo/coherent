import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Main.module.css";
import ChatBoxes from "./chatboxes";
import * as cohere_functions from '../scripts/cohere_functions.js'


(async () => {
  const result = await cohere_functions.extract_keywords("Lets go to a restaurant tonight. Which restaurant do you want to go to? I want to get some mexican food.");
  const response = await cohere_functions.create_prompts('','Any particular reason you want mexican food?', result);
  console.log(response)
})();

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
  const [keywords, setKeywords] = useState("");
  const [sentences, setSentences] = useState([]);

  const onTBChange = (e) => {
    const {value} = e.target;

    setKeywords(value);
    //console.log(value);
  }

  React.useEffect(() => {

    async function update_cohere() {
      console.log(keywords)
      const response = await cohere_functions.create_prompts(keywords, '', '');
      setSentences(response);
      console.log(sentences)
      
    }

    if (keywords != '') {
      update_cohere();
    }
  }, [keywords]);


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
          value={keywords}
          onChange={onTBChange}
        />
        
        <input className={styles.button} type="image" src="/images/microphone.svg" />
      </div>
    </main>
  );
}
