import React, { useState, useEffect } from "react";
import Image from "next/image";

import { getCoordinates, getRem } from "utility";

import styles from "./Type.module.scss";

interface TypeProps {
  type: string;
  center: { x: number; y: number };
  radius: number;
  theta: number;
  isSelected?: boolean;
}

export function Type({ type, center, radius, theta, isSelected }: TypeProps) {
  const [position, setPosition] = useState({ left: "0%", top: "0%" });

  const { left, top } = position;

  useEffect(() => {
    const { x, y } = getCoordinates(theta, radius);

    setPosition({
      left: getRem(center.x + x),
      top: getRem(center.y - y),
    });
  }, [center, radius, theta]);

  return (
    <div
      className={`${styles.type} ${isSelected ? styles.isSelected : ""}`}
      style={{
        left,
        top,
        transform: `translate(-50%, -50%) rotate(${-10}deg)`,
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
