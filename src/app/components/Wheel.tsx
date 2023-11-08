import { useEffect, useState, useRef } from "react";
import { Type } from "components";
import { multiplyByPi, pokemonTypes } from "utility";

import styles from "./Wheel.module.scss";

import { useRotation } from "../../hooks/useRotation";

export function Wheel() {
  const [loaded, setLoaded] = useState(false);
  const wheelRef = useRef(null);
  const { wheel, setWheel } = useRotation(wheelRef, pokemonTypes);

  useEffect(() => {
    if (!wheelRef.current) return;
    const { width, height } = wheelRef.current.getBoundingClientRect();
    const radius = Math.min(width, height) / 2;
    const center = { x: width / 2, y: height / 2 };
    setWheel((prevWheel) => ({ ...prevWheel, center, radius }));
    setLoaded(true);
  }, [setWheel, wheelRef]);

  return (
    <div ref={wheelRef} className={styles.wheel}>
      {loaded &&
        pokemonTypes.map((type, index) => {
          return (
            <Type
              key={index}
              type={type}
              center={wheel.center}
              radius={wheel.radius}
              theta={multiplyByPi(index)}
            />
          );
        })}
    </div>
  );
}
