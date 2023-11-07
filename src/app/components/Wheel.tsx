import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Type } from "components";
import { getCenterOfElement, multiplyByPi, pokemonTypes } from "utility";

import styles from "./Wheel.module.scss";
import { getRem, getCoordinates } from "../../utility/math";

type WheelState = {
  /** The radius of the wheel */
  radius: number;
  /** The center coordinates of the wheel */
  center: { x: number; y: number };
  /** The current angle of the wheel in degrees */
  theta: number;
  /** The ID of the current animation frame */
  animationId: number | null;
  /** The current rotation of the wheel in degrees */
  rotation: number;
  /** The temporary angle of the wheel used during scrolling */
  tempTheta: number;
};

const initialWheelState: WheelState = {
  radius: 250,
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

  useEffect(() => {
    if (!wheelRef.current) return;
    const { width, height } = wheelRef.current.getBoundingClientRect();
    const radius = Math.min(width, height) / 2;
    const center = { x: width / 2, y: height / 2 };
    setWheel((prevWheel) => ({ ...prevWheel, center, radius }));
    setLoaded(true);
  }, []);

  useEffect(() => {
    wheelStateRef.current = wheel;
  }, [wheel]);

  useEffect(() => {
    if (!wheelRef.current) return;
    wheelRef.current.style.setProperty("--rotate-deg", `${wheel.theta}deg`);
    const rotation = (wheel.theta % 360) * -1;
    setWheel((prevWheel) => ({ ...prevWheel, rotation }));
  }, [wheel.theta]);

  const handleScroll = useCallback((event) => {
    clearTimeout(wheelStateRef.current.animationId);
    const scrollSpeed = (event.deltaY / 360) * 20;
    const tempTheta = wheelStateRef.current.tempTheta + scrollSpeed;
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

  return (
    <div onWheel={handleScroll} ref={wheelRef} className={styles.wheel}>
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
