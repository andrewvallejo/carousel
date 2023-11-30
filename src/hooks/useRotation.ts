import { useCallback, useEffect, useState, useRef, useMemo } from "react";

import { getAdjacentType, debounce } from "utility";

import { useScroll } from "hooks";
import { throttle } from "../utility/debounce";

interface useRotationProps {
  /** A Ref object for the wheel element */
  wheelRef: React.RefObject<HTMLDivElement>;
  /** An array of string types */
  types: string[];
}

interface useRotationReturn {
  /** The type currently selected; defaulted to "fighting" */
  selectedType: string;
  /** The current state of the wheel */
  wheel: IWheel;
  /** A function to update the state of the wheel */
  setWheel: React.Dispatch<React.SetStateAction<IWheel>>;
}

const initialWheelState: IWheel = {
  radius: 360,
  center: { x: 0, y: 0 },
  theta: 0,
  animationId: null,
  rotation: 0,
  tempTheta: 0,
};

const intitialType = "fighting";

/**
 * This hook provides a wheel object to manage its properties, it updates the wheel based on scroll events,
 * and syncs those changes with the CSS properties. It also returns the currently selected type, which is
 * determined by the wheel's rotation.
 *
 * @param {useRotationProps} props - The properties passed to the hook
 * @returns {useRotationReturn} The wheel object, a setWheel function to update the rotation, and the currently selected type
 */
export function useRotation({
  wheelRef,
  types,
}: useRotationProps): useRotationReturn {
  const [wheel, setWheel] = useState<IWheel>(initialWheelState);
  const [selectedType, setSelectedType] = useState(intitialType);
  const [isRotating, setIsRotating] = useState(false);

  const wheelStateRef = useRef(wheel);
  wheelStateRef.current = wheel;

  const selectedTypeRef = useRef(selectedType);
  selectedTypeRef.current = selectedType;

  const debouncedRotate = debounce((tempTheta: number) => {
    if (wheelRef.current) {
      wheelRef.current.style.setProperty(
        "transform",
        `rotate(${tempTheta}deg)`,
      );
      Array.from(
        wheelRef.current.children as HTMLCollectionOf<HTMLElement>,
      ).forEach((child: HTMLElement) => {
        child.style.setProperty(
          "transform",
          `translate(-50%, -50%) rotate(${-1.0 * tempTheta}deg)`,
        );
      });
      setIsRotating(false);
    }
  }, 300);

  const handleRotate = useCallback(
    (delta: number) => {
      if (isRotating) return;

      setIsRotating(true);

      const direction = delta > 0 ? "next" : "previous";
      const newType = getAdjacentType(selectedTypeRef.current, direction);
      setSelectedType(newType);

      const rotateSpeed = delta;

      let tempTheta =
        Math.round((wheelStateRef.current.tempTheta + rotateSpeed + 10) / 20) *
          20 -
        10;

      debouncedRotate(tempTheta);

      const animationId = setTimeout(() => {
        setWheel((prevWheel: IWheel) => ({
          ...prevWheel,
          theta: tempTheta,
          animationId,
          tempTheta,
        }));
      }, 150);
    },
    [selectedTypeRef, wheelStateRef, debouncedRotate, isRotating],
  );

  useScroll(handleRotate);

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.setProperty(
        "transform",
        `rotate(${wheel.theta}deg)`,
      );
    }
  }, [wheel.theta, wheelRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const rotate = { right: 20, left: -20 };

      if (event.key === "ArrowRight") {
        handleRotate(rotate.right);
      } else if (event.key === "ArrowLeft") {
        handleRotate(rotate.left);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRotate]);

  return { wheel, setWheel, selectedType };
}
