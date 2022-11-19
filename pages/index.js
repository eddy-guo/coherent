import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "../styles/Home.module.css";

export default function Home() {
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
          content="https://www.eddyguo.ca//ogimage.png"
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
              position
            />
          </div>
        </div>
        <Link href="/main">Continue</Link>
      </main>
    </div>
  );
}
