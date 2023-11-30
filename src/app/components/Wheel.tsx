import { useEffect, useRef, useState } from "react";

import { multiplyByPi, pokemonTypes } from "utility";
import { Type } from "components";
import { useRotation } from "hooks";

import styles from "./Wheel.module.scss";

export const Wheel = () => {
  const [loaded, setLoaded] = useState(false);

  const wheelRef = useRef<HTMLDivElement>(null);

  const { selectedType, wheel, setWheel } = useRotation({
    wheelRef,
    types: pokemonTypes,
  });

  useEffect(() => {
    if (!wheelRef.current) return;

    const { width, height } = wheelRef.current.getBoundingClientRect();

    let radius = 380 / 2;
    if (window.innerWidth <= 480) {
      radius = 300 / 2; // Adjust this value as needed
    }

    const center = { x: width / 2, y: height / 2 };
    const initialTheta = 10;

    setWheel((prevWheel: IWheel) => ({
      ...prevWheel,
      center,
      radius,
      theta: initialTheta,
    }));

    setLoaded(true);
  }, [setWheel, wheelRef]);

  return (
    <div ref={wheelRef} className={styles.wheel}>
      {loaded &&
        pokemonTypes.map((type: string, index: number) => {
          return (
            <Type
              key={type}
              type={type}
              center={wheel.center}
              radius={wheel.radius}
              theta={multiplyByPi(index)}
              isSelected={selectedType === pokemonTypes[index]}
            />
          );
        })}
    </div>
  );
};
