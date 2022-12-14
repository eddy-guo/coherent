import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Main.module.css";
// import ChatBoxes from "./chatboxes";
import * as cohere_functions from "../scripts/cohere_functions.js";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

export default function Main() {
  const [keywords, setKeywords] = useState("");
  const [sentences, setSentences] = useState([]); //generated sentences
  const [torv, setTorv] = useState(true);
  const [lst, setLst] = React.useState([]);
  const [conv_keywords, setConv_keywords] = useState("");
  const [convstr, setConvstr] = useState("");
  const [prevmsg, setPrevmsg] = useState("");
  const [myprevmsg, setMyprevmsg] = useState("");
  const [leftEmotion, setLeftEmotion] = useState("😃");
  const [rightEmotion, setRightEmotion] = useState("😃");

  const { speak } = useSpeechSynthesis();

  const eddy = "woZwya6D";
  const amey = "Zxk7YsZ3LHyDt";
  const leon = "TB5DX1F2j";
  const leon2 = "WKHlMbGrAm";

  const cohere = require("cohere-ai");
  cohere.init(eddy + leon + amey + leon2);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onTBChange = (e) => {
    const { value } = e.target;

    setKeywords(value);
    setTorv(true);
    //console.log(value);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  React.useEffect(() => {
    setKeywords(transcript);
    setTorv(false);
  }, [transcript]);

  React.useEffect(() => {
    async function update_cohere() {
      console.log(keywords);

      const response = await cohere_functions.create_prompts(
        keywords,
        prevmsg,
        conv_keywords,
        cohere
      );
      setSentences(response);
      console.log(sentences);
    }

    const timer = setTimeout(() => {
      if (keywords != "") {
        update_cohere();
      } else {
        setSentences([])
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [keywords]);

  React.useEffect(() => {
    async function convkeywordsgen() {
      const response = await cohere_functions.extract_keywords(convstr, cohere);
      setConv_keywords(response);
    }

    if (convstr != "") {
      convkeywordsgen();
    }
  }, [convstr]);

  React.useEffect(() => {
    async function findmyemotion() {
      const response = await cohere_functions.get_sentiment(myprevmsg, cohere);
      setLeftEmotion(response);
      console.log(response);
    }

    if (myprevmsg != '') findmyemotion();
  }, [myprevmsg]);

  React.useEffect(() => {
    async function findmyemotion() {
      const response = await cohere_functions.get_sentiment(prevmsg, cohere);
      setRightEmotion(response)
      console.log(response);
    }
    if (prevmsg != '') findmyemotion();
  }, [prevmsg]);

  const handleAdd = () => {
    const newLst = lst;
    console.log(torv)
    if (torv) {
      newLst.push({ side: "left", content: keywords });
      setMyprevmsg(keywords);
    } else {
      newLst.push({ side: "right", content: keywords });
      setPrevmsg(keywords);
    }

    if (newLst.length > 1) {
      let tempstr = "";
      for (let i = newLst.length - 2; i >= 0 && i >= newLst.length - 5; i--) {
        tempstr = newLst[i].content + " " + tempstr;
      }
      setConvstr(tempstr);
    }

    setLst(newLst);
    setKeywords("");
    setSentences([]);
    console.log(convstr, conv_keywords, prevmsg);
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser does not support speech recognition.</span>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function populate(string, index) {
    if (index % 2 == 0) {
      return (
        <div className={styles.rightmessage}>
          <button className={styles.righttext}>{string}</button>
        </div>
      );
    } else {
      return (
        <div className={styles.leftmessage}>
          <button className={styles.lefttext}>{string}</button>
        </div>
      );
    }
  }
  return (
    <div className={styles.total}>
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand"
        rel="stylesheet"></link>
      {/* <div className={styles.sentiment}>Current Sentiment: </div> */}
      <main className={styles.main}>
        <Head>
          <title>co:herent - Main</title>
          
        </Head>
        <div className={styles.header_row}>
          <h1 className={styles.leftemotion}>{leftEmotion}</h1>
          <h1 className={styles.header}><Link href="/">co:herent</Link></h1>
          <h1 className={styles.rightemotion}>{rightEmotion}</h1>
        </div>
        {/* <ChatBoxes chat_messages={testing_chat_msgs} /> */}
        <div className={styles.messages}>
          <ul className={styles.ul}>
            {lst.length > 0 &&
              lst.map((item) => {
                if (item.side == "left") {
                  return (
                    <div className={styles.leftmessage} key={item.id}>
                      <button
                        className={styles.lefttext}
                        onClick={() => speak({ text: item.content })}>
                        {item.content}
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className={styles.rightmessage} key={item.id}>
                      <button className={styles.righttext}>
                        {item.content}
                      </button>
                    </div>
                  );
                }
              })}
          </ul>
        </div>
        <div className={styles.inputarea}>
          {/* {torv ? */}
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
          {/* //   :
        //   <div id="voicefield">
        //     <input
        //       className={styles.input}
        //       placeholder="Press the mic to speak"
        //       value={transcript}
        //     />
        //   </div>
        // } */}

          <input
            className={styles.submitbutton}
            type="image"
            src="/images/submit.png"
            onClick={
              /* submit */ () => {
                handleAdd();
                resetTranscript();
                setTorv(!torv);
              }
            }
            disabled={transcript == "" && keywords == ""}
          />
          <input
            className={styles.microphonebutton}
            type="image"
            src="/images/microphone.svg"
            onClick={SpeechRecognition.startListening}
          />
        </div>

        <div className={styles.sentence_gen}>
          <ul className={styles.sentence_gen_list}>
            {sentences.length > 0 ? (
              sentences.map((sentence) => (
                <li
                  className={styles.sentence_gen_item}
                  key={sentence}
                  onClick={() => {
                    setKeywords(sentence);
                    setTorv(true);
                  }}>
                  <a className={styles.sentence_gen_item_a}>{sentence}</a>
                </li>
              ))
            ) : (
              <li className={styles.sentence_gen_item}>
                <a className={styles.sentence_gen_no_gens}>. . .</a>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
