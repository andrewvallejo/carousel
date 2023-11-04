import styles from "./card.module.scss";

export default function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
