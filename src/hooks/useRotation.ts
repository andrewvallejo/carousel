// Packages
import { useCallback, useEffect, useRef, useState } from "react";
// Hooks
import { useScroll } from "hooks/useScroll";
// Utility
import { debounce } from "utility/debounce";
import { getAdjacentType } from "utility/types";

interface useRotationProps {
  /** A Ref object for the wheel element */
  wheelRef: React.RefObject<HTMLDivElement>;
  /** An array of string types */
  types: string[];
  /** A function to set the selected type */
  setSelectedType: (value: PokemonType) => void;
  /** The currently selected type */
  selectedType: PokemonType;
}

interface useRotationReturn {
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

export function useRotation({
  wheelRef,
  setSelectedType,
  selectedType,
}: useRotationProps): useRotationReturn {
  const [wheel, setWheel] = useState<IWheel>(initialWheelState);
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
    [debouncedRotate, isRotating, setSelectedType],
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

  return { wheel, setWheel };
}
