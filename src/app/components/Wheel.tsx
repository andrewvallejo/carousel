import { useEffect, useState, useRef, useCallback } from "react";

import Type from "./Type";

import { getCenterOfElement, multiplyByPi } from "utility/math";
import pokemonTypes from "utility/types";

import styles from "./Wheel.module.scss";

interface WheelProps {
  Types: any[];
}

const initialWheel = {
  radius: 250,
  center: { x: 0, y: 0 },
  theta: 0,
  animationId: null,
};

export default function Wheel() {
  const [wheel, setWheel] = useState(initialWheel);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (wheelRef.current) {
      const centerOfWheel = getCenterOfElement(wheelRef.current);
      setWheel((prevWheel) => ({ ...prevWheel, center: centerOfWheel }));
    }
  }, [wheelRef]);

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${wheel.theta}deg)`;
    }
  }, [wheel.theta]);

  const handleScroll = (event) => {
    const wheelTheta = wheel.theta + event.deltaY * 0.07;

    if (wheel.animationId) {
      cancelAnimationFrame(wheel.animationId);
    }

    const animationId = requestAnimationFrame(() => {
      setWheel((prevWheel) => ({ ...prevWheel, theta: wheelTheta }));
    });

    setWheel((prevWheel) => ({ ...prevWheel, animationId }));
  };

  return (
    <div onWheel={handleScroll} ref={wheelRef} className={styles.wheel}>
      {pokemonTypes.map((type, index) => (
        <Type
          key={index}
          title="Effectiveness Chart"
          type={type}
          center={wheel.center}
          radius={wheel.radius}
          theta={multiplyByPi(index)}
        />
      ))}
    </div>
  );
}
