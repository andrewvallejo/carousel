import { useEffect, useState, useRef, useCallback } from "react";

import { Type } from "components";

import { getCenterOfElement, multiplyByPi, pokemonTypes } from "utility";

import styles from "./Wheel.module.scss";

/** The initial state of the wheel */
const initialWheel: {
  /** The radius of the wheel. */
  radius: number;
  /** The center point of the wheel. */
  center: { x: number; y: number };
  /** The angle of the wheel. */
  theta: number;
  /** The ID of the animation. */
  animationId: number | null;
} = {
  radius: 250,
  center: { x: 0, y: 0 },
  theta: 0,
  animationId: null,
};

/**
 * Renders a wheel component that displays a list of Pokemon types.
 * @returns {JSX.Element} The Wheel component.
 */
export function Wheel() {
  const [wheel, setWheel] = useState(initialWheel);

  const wheelRef = useRef();

  /**
   * Updates the center of the wheel when the component mounts or the wheelRef changes.
   */
  useEffect(() => {
    if (wheelRef.current) {
      const centerOfWheel = getCenterOfElement(wheelRef.current);
      setWheel((prevWheel) => ({ ...prevWheel, center: centerOfWheel }));
    }
  }, [wheelRef]);

  /**
   * Rotates the wheel when the theta value changes.
   */
  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.setProperty("--rotate-deg", `${wheel.theta}deg`);
    }
  }, [wheel.theta]);

  const handleScroll = useCallback(
    (event) => {
      const wheelTheta = wheel.theta + event.deltaY * 0.07;

      if (wheel.animationId) {
        cancelAnimationFrame(wheel.animationId);
      }

      const animationId = requestAnimationFrame(() => {
        setWheel((prevWheel) => ({ ...prevWheel, theta: wheelTheta }));
      });

      setWheel((prevWheel) => ({ ...prevWheel, animationId }));
    },
    [wheel]
  );

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
