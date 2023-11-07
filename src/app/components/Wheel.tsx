import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Type } from "components";
import { multiplyByPi, pokemonTypes } from "utility";

import styles from "./Wheel.module.scss";
import useScroll from "../../hooks/useScroll";

const initialWheelState = {
  radius: 360,
  center: { x: 0, y: 0 },
  theta: 0,
  animationId: null,
  rotation: 0,
  tempTheta: 0,
};

export function Wheel() {
  const [wheel, setWheel] = useState(initialWheelState);
  const [loaded, setLoaded] = useState(false);

  const wheelStateRef = useRef(wheel);
  const wheelRef = useRef(null);

  const handleRotate = useCallback((delta) => {
    clearTimeout(wheelStateRef.current.animationId);
    const rotateSpeed = delta;

    let tempTheta =
      Math.round((wheelStateRef.current.tempTheta + rotateSpeed + 10) / 20) *
        20 -
      10;

    wheelRef.current.style.setProperty("transform", `rotate(${tempTheta}deg)`);
    Array.from(wheelRef.current.children).forEach((child) => {
      child.style.setProperty(
        "transform",
        `translate(-50%, -50%) rotate(${-1.0 * tempTheta}deg)`
      );
    });
    const animationId = setTimeout(() => {
      setWheel((prevWheel) => ({ ...prevWheel, theta: tempTheta }));
    }, 150);

    setWheel((prevWheel) => ({ ...prevWheel, animationId, tempTheta }));
  }, []);

  // Use the useScroll hook here
  useScroll(handleRotate);

  useEffect(() => {
    wheelStateRef.current = wheel;
  }, [wheel]);

  useEffect(() => {
    if (!wheelRef.current) return;
    const { width, height } = wheelRef.current.getBoundingClientRect();
    const radius = Math.min(width, height) / 2;
    const center = { x: width / 2, y: height / 2 };
    setWheel((prevWheel) => ({ ...prevWheel, center, radius }));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!wheelRef.current) return;
    const { width, height } = wheelRef.current.getBoundingClientRect();
    const radius = Math.min(width, height) / 2;
    const center = { x: width / 2, y: height / 2 };
    setWheel((prevWheel) => ({ ...prevWheel, center, radius }));
    setLoaded(true);
  }, [wheelRef]);

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
