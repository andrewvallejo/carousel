"use client";
import styles from "./page.module.scss";
import Type from "./components/Type";
import Wheel from "./components/Wheel";

export default function Home() {
  return (
    <main className={styles.main}>
      <Wheel />
    </main>
  );
}
