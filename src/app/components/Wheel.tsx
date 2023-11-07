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

    // We need to ensure our rotation snaps with a type at the top, not between types.
    // As each type is separated by 20 degrees, we offset our rotation by 10 degrees
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

  // variable to store the timestamp of the latest event
  let lastEventTime = 0;
  const throttleTime = 200; // define a buffering time of 200ms

  const lastEventTimeRef = useRef(0);

  const handleScroll = useCallback(
    (event) => {
      const currentTime = new Date().getTime(); // get the current time
      if (currentTime - lastEventTimeRef.current > throttleTime) {
        // check if enough time has passed since the last event
        const rotateDegree = 20; // One type at a time
        handleRotate(Math.sign(event.deltaY) * rotateDegree); // if so, we process the event
        lastEventTimeRef.current = currentTime; // and update the timestamp of the latest event
      }
    },
    [handleRotate]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 37) {
        // Left Arrow Key
        handleRotate(-20);
      } else if (event.keyCode === 39) {
        // Right Arrow Key
        handleRotate(20);
      }
    },
    [handleRotate]
  );

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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleKeyDown, handleScroll]);

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
