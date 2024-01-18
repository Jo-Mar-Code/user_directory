import { useEffect, useState } from "react";

import Head from "next/head";
import Usercard from "./Usercard";

import styles from "../styles/Home.module.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOption, setSearchOption] = useState("2");
  const [nbUsers, setNbUsers] = useState(10);

  useEffect(() => {
    if (search) {
      setUsers(searchResults);
    } else {
      fetch(
        `https://randomuser.me/api/?page=${page}&results=${nbUsers}&nat=fr&seed=fr`
      )
        .then((response) => response.json())
        .catch((err) => alert(err))
        .then((data) => {
          setUsers(data.results);
        });
    }
  }, [page, search, nbUsers]);

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setSearch("");
    }
  };

  const goToNextPage = () => {
    setPage(page + 1);
    setSearch("");
  };

  const handleSearch = (searchValue) => {
    console.log(searchOption, searchValue);
    if (searchOption === "1") {
      const results = users.filter((result) =>
        result.name.first.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    } else if (searchOption === "2") {
      const results = users.filter((result) =>
        result.name.last.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    } else if (searchOption === "3") {
      const results = users.filter((result) =>
        result.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    }

    setSearch(searchValue);
  };

  const userCards = users.map((data, i) => {
    return <Usercard key={i} {...data} />;
  });

  const handleOptionChange = (changeEvent) => {
    setSearchOption(changeEvent);
  };

  return (
    <div className={styles.fullPage}>
      <Head>
        <title>User Directory</title>
      </Head>

      <header className={styles.header}>
        <p className={styles.title}>USER DIRECTORY</p>

        <div className={styles.search}>
          <input
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
            placeholder="Search user"
          />
        </div>

        <div className={styles.radio}>
          <div>
            <label>
              <input
                type="radio"
                name="selectedOption"
                value="1"
                onChange={(e) => handleOptionChange(e.target.value)}
              />
              By firstname
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="selectedOption"
                value="2"
                onChange={(e) => handleOptionChange(e.target.value)}
              />
              By lastname
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="selectedOption"
                value="3"
                onChange={(e) => handleOptionChange(e.target.value)}
              />
              By email
            </label>
          </div>
        </div>

        <div className={styles.nbUsers}>
          <p>Users per page : &nbsp;</p>
          <input onChange={(e) => setNbUsers(e.target.value)} value={nbUsers} />
        </div>
      </header>

      <main className={styles.mainContainer}>{userCards}</main>
      <div className={styles.nav}>
        <button className={styles.button} onClick={() => goToPreviousPage()}>
          Prev. page
        </button>
        <p>Page {page}</p>
        <button className={styles.button} onClick={() => goToNextPage()}>
          Next page
        </button>
      </div>
    </div>
  );
}

export default Home;
