import styles from "./page.module.scss";
import Card from "./components/Card";
import Wheel from "./components/Wheel";

export default function Home() {
  return (
    <main className={styles.main}>
      <Card title="Effectiveness Chart">
        <Wheel />
      </Card>
    </main>
  );
}
