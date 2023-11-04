import { useEffect, useState, useRef } from "react";

import Card from "./Card";

import styles from "./wheel.module.scss";
import { getCenterOfElement } from "../../utility/math";

const initialWheel = {
  radius: 1,
  center: { x: 0, y: 0 },
  theta: 0,
};

export default function Wheel() {
  const [wheel, setWheel] = useState(initialWheel);

  const wheelRef = useRef(null);

  useEffect(() => {
    if (wheelRef.current) {
      const centerOfWheel = getCenterOfElement(wheelRef.current);
      $: console.log("centerOfWheel", centerOfWheel);

      setWheel((prevWheel) => ({ ...prevWheel, center: centerOfWheel }));
    }
  }, [wheelRef]);

  return (
    <div ref={wheelRef} className={styles.wheel}>
      <Card
        title="Effectiveness Chart"
        center={wheel.center}
        radius={wheel.radius}
        theta={wheel.theta}
      />
    </div>
  );
}
