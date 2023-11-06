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
  const [isPaused, setIsPaused] = useState(false);

  const wheelStateRef = useRef(wheel);
  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!wheelRef.current) return;
    const { width, height } = wheelRef.current.getBoundingClientRect();
    const radius = Math.min(width, height) / 1.5;
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

  const snapToTop = useCallback((wheel) => {
    const centerOfWheel = {
      x:
        wheelRef.current.getBoundingClientRect().x +
        wheelRef.current.getBoundingClientRect().width / 2,
      y:
        wheelRef.current.getBoundingClientRect().y +
        wheelRef.current.getBoundingClientRect().height / 2,
    };

    let shortestDistance = Infinity;
    let closestItem = null;

    // Loop through all items and compare distances to centerOfWheel; find shortest distance
    Array.from(wheelRef.current.children).forEach((item) => {
      const itemCenter = {
        x:
          item.getBoundingClientRect().x +
          item.getBoundingClientRect().width / 2,
        y:
          item.getBoundingClientRect().y +
          item.getBoundingClientRect().height / 2,
      };

      const dx = itemCenter.x - centerOfWheel.x;
      const dy = itemCenter.y - centerOfWheel.y;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);

      if (shortestDistance >= currentDistance) {
        shortestDistance = currentDistance;
        closestItem = item;
      }
    });

    // Calculate the rotation needed to align the closest item to the top
    const closestItemCenter = {
      x:
        closestItem.getBoundingClientRect().x +
        closestItem.getBoundingClientRect().width / 2,
      y:
        closestItem.getBoundingClientRect().y +
        closestItem.getBoundingClientRect().height / 2,
    };

    let closestItemTheta = Math.atan2(
      closestItemCenter.y - centerOfWheel.y,
      closestItemCenter.x - centerOfWheel.x
    );
    closestItemTheta = closestItemTheta * (180 / Math.PI) + 90; // Convert to degrees and adjust by 90 degrees to align with the top

    // Adjust closestItemTheta to be within -90 to 90 degrees
    if (closestItemTheta > 180) {
      closestItemTheta -= 360;
    }

    let snapRotation = closestItemTheta - wheel.theta;
    // Adjust snapRotation to be within -90 to 90 degrees
    snapRotation = ((snapRotation + 90) % 180) - 90;

    const newTheta = wheel.theta + snapRotation;
    setWheel((prevWheel) => ({
      ...prevWheel,
      theta: newTheta,
    }));
    setRotation(newTheta);

    // Adjust the transition for snapping
    wheelRef.current.style.transition = "transform 0.5s"; // Adjust the time as needed

    setTimeout(() => {
      setIsPaused(false);
    }, 500); // Adjust the delay as needed
  }, []);

  const handleScroll = useCallback(
    (event) => {
      if (isPaused) {
        return;
      }

      clearTimeout(wheelStateRef.current.animationId);
      const scrollSpeed = (event.deltaY / 360) * 20;
      const tempTheta = wheelStateRef.current.tempTheta + scrollSpeed;
      wheelRef.current.style.setProperty(
        "transform",
        `rotate(${tempTheta}deg)`
      );
      Array.from(wheelRef.current.children).forEach((child) => {
        child.style.setProperty(
          "transform",
          `translate(-50%, -50%) rotate(${-1.0 * tempTheta}deg)`
        );
      });
      const animationId = setTimeout(() => {
        setWheel((prevWheel) => {
          const newWheel = { ...prevWheel, theta: tempTheta };
          snapToTop(newWheel);
          return newWheel;
        });
        setIsPaused(true); // Move setIsPaused(true) inside the timeout callback
      }, 1000); // Increase the timeout value to 1000ms
      setWheel((prevWheel) => ({ ...prevWheel, animationId, tempTheta }));
    },
    [isPaused, snapToTop]
  );

  const wheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.5s ease-out",
  };

  return (
    <div
      onWheel={handleScroll}
      ref={wheelRef}
      className={styles.wheel}
      style={wheelStyle}
    >
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
