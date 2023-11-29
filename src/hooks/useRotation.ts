import { useEffect, useState, useCallback } from "react";

import { useScroll } from "hooks";
import { getClosestType, getNextType, getAdjacentType } from "../utility/types";

interface useRotationProps {
  /** A Ref object for the wheel element */
  wheelRef: React.RefObject<HTMLDivElement>;
  /** An array of string types */
  types: string[];
}

/** The return type of the useRotation hook */
interface useRotationReturn {
  /** The current state of the wheel */
  wheel: IWheel;
  /** A function to update the state of the wheel */
  setWheel: React.Dispatch<React.SetStateAction<IWheel>>;
}

export interface IWheel {
  /** The radius of the wheel */
  radius: number;
  /** The x and y coordinates at the center of the wheel */
  center: {
    /** The x Coordinate at the center of the wheel */
    x: number;
    /** The y Coordinate at the center of the wheel */
    y: number;
  };
  /** The rotational angle of the wheel with respect to its initial position */
  theta: number;
  /** The ID value of the scheduled animation, `null` if not scheduled */
  animationId: NodeJS.Timeout | null;
  /** The amount of degrees the wheel has been rotated */
  rotation: number;
  /** Temporary value for `theta` used while calculating rotation */
  tempTheta: number;
}

const initialWheelState: IWheel = {
  radius: 360,
  center: { x: 0, y: 0 },
  theta: 0,
  animationId: null,
  rotation: 0,
  tempTheta: 0,
};

export function useRotation({ wheelRef, types }: useRotationProps) {
  const [wheel, setWheel] = useState<IWheel>(initialWheelState);
  const [selectedType, setSelectedType] = useState(types[5]);
  $: console.log("selectedType", JSON.stringify(selectedType, null, 2));

  const handleRotate = useCallback(
    (delta: number) => {
      if (wheel.animationId !== null) {
        clearTimeout(wheel.animationId);
      }

      const direction = delta > 0 ? "next" : "previous";
      const newType = getAdjacentType(selectedType, direction);
      setSelectedType(newType);

      const rotateSpeed = delta;

      let tempTheta =
        Math.round((wheel.tempTheta + rotateSpeed + 10) / 20) * 20 - 10;

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
      }

      const animationId = setTimeout(() => {
        setWheel((prevWheel: IWheel) => ({ ...prevWheel, theta: tempTheta }));
      }, 150);

      setWheel((prevWheel: IWheel) => ({
        ...prevWheel,
        animationId,
        tempTheta,
      }));
    },
    [selectedType, wheel.animationId, wheel.tempTheta, wheelRef],
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
