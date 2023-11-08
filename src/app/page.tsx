"use client";
import { Wheel } from "components";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Wheel />
    </main>
  );
}
