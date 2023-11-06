"use client";
import styles from "./page.module.scss";
import { Wheel } from "components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Wheel />
    </main>
  );
}
