import { useEffect, useState, useRef } from "react";

import { Type } from "components";

import { multiplyByPi, pokemonTypes } from "utility";

import { useRotation } from "hooks";

import { IWheel } from "hooks";

import styles from "./Wheel.module.scss";

export function Wheel() {
  const [loaded, setLoaded] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { wheel, setWheel } = useRotation({ wheelRef, types: pokemonTypes });

  useEffect(() => {
    if (!wheelRef.current) return;
    const { width, height } = wheelRef.current.getBoundingClientRect();
    const radius = Math.min(380) / 2;
    const center = { x: width / 2, y: height / 2 };
    setWheel((prevWheel: IWheel) => ({
      ...prevWheel,
      center,
      radius,
    }));
    setLoaded(true);
  }, [setWheel, wheelRef]);

  return (
    <div ref={wheelRef} className={styles.wheel}>
      {loaded &&
        pokemonTypes.map((type: string, index: number) => {
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
