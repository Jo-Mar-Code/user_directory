import styles from "../styles/Usercard.module.css";

function Usercard(props) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5)70%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%), url(${props.picture.large})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.identity}>
        <p>{props.name.first}</p>
        <p>{props.name.last}</p>
        <p className={styles.email}>{props.email}</p>
      </div>
    </div>
  );
}

export default Usercard;
