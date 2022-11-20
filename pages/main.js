import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Main.module.css";
// import ChatBoxes from "./chatboxes";
import * as cohere_functions from "../scripts/cohere_functions.js";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Main() {
  const [keywords, setKeywords] = useState("");
  const [sentences, setSentences] = useState([]);
  const [torv, setTorv] = useState(true);
  const [lst, setLst] = React.useState([]);

  const eddy = 'woZwya6D'
  const amey = 'Zxk7YsZ3LHyDt'
  const leon = 'TB5DX1F2j'
  const leon2 = 'WKHlMbGrAm'

  const cohere = require("cohere-ai");
  cohere.init(eddy + leon + amey + leon2);

  const onTBChange = (e) => {
    const { value } = e.target;

    setKeywords(value);
    //console.log(value);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  React.useEffect(() => {
    async function update_cohere() {
      console.log(keywords);
      const response = await cohere_functions.create_prompts(
        keywords,
        "",
        "",
        cohere
      );
      setSentences(response);
      console.log(sentences);
    }

    if (keywords != "") {
      update_cohere();
    }
  }, [keywords]);

  const handleAdd = () => {
    const newLst = lst;

    newLst.push(keywords + transcript);

    setLst(newLst);
    setKeywords("");
  };

  useEffect(() => {
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
      <h1 className={styles.header}>Co:herent</h1>
      {/* <ChatBoxes chat_messages={testing_chat_msgs} /> */}
      <ul>{lst.length > 0 && lst.map((item) => <li key={item.id}>{item}</li>)}</ul>
      <div className={styles.inputarea}>
        {torv ?
          <div id="textfield">
            <input
              className={styles.input}
              type="text"
              id="input"
              name="input-text"
              placeholder="Input your text here"
              value={keywords}
              onChange={onTBChange}
            />
          </div>
          :
          <div id="voicefield">
            <input
              className={styles.input}
              placeholder="Press the mic to speak"
              value={transcript}
            />
          </div>
        }
        <input
          className={styles.button}
          type="image"
          src="/images/microphone.svg"
          onClick={/* submit */() => { handleAdd(); resetTranscript(); setTorv(!torv); }}
          disabled={transcript == "" && keywords == ""}
        />
        <input
          className={styles.button}
          type="image"
          src="/images/microphone.svg"
          onClick={SpeechRecognition.startListening}
          disabled={torv}
        />
      </div>

      <div>
          <ul>
            {sentences.length > 0 ? (
              sentences.map((sentence) => (
                <li key={sentence}>
                  <p>{sentence}</p>
                </li>
              ))
            ): (
              <li><p>No results/loading</p></li>
            )}
          </ul>

      </div>
    </main>
  );
}
