import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import * as cohere_functions from "../scripts/cohere_functions.js";
import React, { useState, useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const support = () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand"
        rel="stylesheet"></link>
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
        <meta
          property="og:image"
          content="https://www.coherentapp.tech//meta-img.png"
        />
        {/* Twitter */}
        <meta
          property="twitter:card"
          content="https://www.coherentapp.tech//meta-img.png"
        />
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
        <div className={styles.header}>
          <Link className={styles.image} href="/">
            <Image
              src="/images/header-img.png"
              alt="logo"
              width="100"
              height="100"
            />
          </Link>
          <ul className={styles.headertext}>
            <li>
              <a
                href="https://www.eddyguo.ca/"
                target="_blank"
                rel="noreferrer">
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://github.com/eddy-guo/coherent"
                target="_blank"
                rel="noreferrer">
                Source Code (GitHub)
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/wetpeeker"
                target="_blank"
                rel="noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://devpost.com/" target="_blank" rel="noreferrer">
                Devpost
              </a>
            </li>
          </ul>
        </div>
        <span className={styles.welcome}>WELCOME TO CO:HERENT</span>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            Bringing <span className={styles.highlight}>accessibility</span> to{" "}
            <span className={styles.highlight}>communcation.</span>
          </h1>
        </div>
        <span className={styles.description}>
          Co:herent is a digital service that brings accessibility to
          interpersonal conversation with seamless adaptability to everyday use,
          built for an inclusive future.
        </span>
        <Link href="/main">
          <button className={styles.continue}>Continue to App</button>
        </Link>
      </main>
    </div>
  );
}
