import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

function Home() {

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

export default Home;
