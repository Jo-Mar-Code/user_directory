import { useEffect, useState } from 'react';

import Head from 'next/head';
import Usercard from './Usercard';

import styles from '../styles/Home.module.css';

function Home() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=10&nat=fr&seed=abc')
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        setUsers(data.results);
      });
  }, []);

  
  const userCards = users.map((data, i) => {
    return <Usercard key={i} {...data}/>;
  });
  
  return (
    <div>
      <Head>
        <title>User Directory</title>
      </Head>

      <main className={styles.mainContainer}>
        {userCards}
      </main>
    </div>
  );
}

export default Home;
