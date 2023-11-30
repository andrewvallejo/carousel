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

  let imageSize = 64;
  if (typeof window !== "undefined" && window.innerWidth <= 480) {
    imageSize = 48; // Adjust this value as needed
  }

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
        ...position,
        transform: `translate(-50%, -50%) rotate(${-10}deg)`,
      }}
    >
      <Image
        priority
        src={`/types/${type}.png`}
        alt={type}
        width={imageSize}
        height={imageSize}
      />
    </div>
  );
}
