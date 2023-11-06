import React, { useState, useEffect } from "react";
import Image from "next/image";

import { getCoordinates, getRem } from "utility";

import styles from "./Type.module.scss";

interface TypeProps {
  /** Indi */
  isLoaded: boolean;
  /** The type of the item */
  type: string;
  /** The center coordinates of the wheel */
  center: { x: number; y: number };
  /** The radius of the wheel */
  radius: number;
  /** The current angle of the item in the wheel */
  theta: number;
}

const initialPosition = { left: "0rem", top: "0rem" };

/** Type component represents a single item in the wheel  */
export function Type({ type, center, radius, theta, isLoaded }: TypeProps) {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const { x, y } = getCoordinates(theta, radius);
    const left = getRem(center.x + x);
    const top = getRem(center.y + y);
    setPosition({ left, top });
  }, [center, radius, theta]);

  const rotation = -theta;

  return (
    <div
      className={`${styles.type} ${isLoaded ? styles.loaded : ""}`}
      style={{
        ...position,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}rad)`,
        opacity: isLoaded ? 1 : 0,
      }}
    >
      <Image
        priority
        src={`/types/${type}.png`}
        alt={type}
        width={64}
        height={64}
      />
    </div>
  );
}
