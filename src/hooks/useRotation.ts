import { useEffect, useState, useCallback } from "react";

import useScroll from "./useScroll";

const initialWheelState = {
  /** The radius of the wheel */
  radius: 360,
  /** The x and y coordinates at the center of the wheel */
  center: {
    /** The x Coordinate at the center of the wheel */
    x: 0,
    /** The y Coordinate at the center of the wheel */
    y: 0,
  },
  /** The rotational angle of the wheel with respect to its initial position */
  theta: 0,
  /** The ID value of the scheduled animation, `null` if not scheduled */
  animationId: null,
  /** The amount of degrees the wheel has been rotated */
  rotation: 0,
  /** Temporary value for `theta` used while calculating rotation */
  tempTheta: 0,
};

const initialWheelState = {
  radius: 360,
  center: { x: 0, y: 0 },
  theta: 0,
  animationId: null,
  rotation: 0,
  tempTheta: 0,
};

export function useRotation(wheelRef, types) {
  const [wheel, setWheel] = useState(initialWheelState);

  const handleRotate = useCallback(
    (delta) => {
      clearTimeout(wheel.animationId);
      const rotateSpeed = delta;

      let tempTheta =
        Math.round((wheel.tempTheta + rotateSpeed + 10) / 20) * 20 - 10;

      if (wheelRef.current) {
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
      }
      const animationId = setTimeout(() => {
        setWheel((prevWheel) => ({ ...prevWheel, theta: tempTheta }));
      }, 150);

      setWheel((prevWheel) => ({ ...prevWheel, animationId, tempTheta }));
    },
    [wheel.animationId, wheel.tempTheta, wheelRef]
  );

  useScroll(handleRotate);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const rotate = { right: 20, left: -20 };

      if (e.key === "ArrowRight") {
        handleRotate(rotate.right);
      } else if (e.key === "ArrowLeft") {
        handleRotate(rotate.left);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRotate]);

  return { wheel, setWheel };
}
