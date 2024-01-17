import { useEffect, useState } from 'react';

import Head from 'next/head';
import Usercard from './Usercard';

import styles from '../styles/Home.module.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${page}&results=10&nat=fr&seed=abc`)
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        setUsers(data.results);
      });
  }, [page]);

  const firstPage = () => {
    if (page > 1) { 
      setPage(page - 1);
    }
  }
  
  const userCards = users.map((data, i) => {
    return <Usercard key={i} {...data}/>;
  });
  
  return (
    <div className={styles.fullPage}>
      <Head>
        <title>User Directory</title>
      </Head>

      <main className={styles.mainContainer}>
        {userCards}
      </main>
      <div className={styles.nav}>
        <button className={styles.button} onClick={() => firstPage()}>Prev. page</button>
        <p>Page {page}</p>
        <button className={styles.button} onClick={() => setPage(page + 1)}>Next page</button>
      </div>
     
    </div>
  );
}

export default Home;
