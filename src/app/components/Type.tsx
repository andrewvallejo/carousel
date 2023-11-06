import React, { useState } from "react";
import Image from "next/image";

import { getCoordinates, getRem } from "utility";

import styles from "./Type.module.scss";

export function Type({ type, center, radius, theta }) {
  const { x, y } = getCoordinates(theta, radius);

  const left = getRem(center.x + x);
  const top = getRem(center.y + y);

  return (
    <div className={styles.type} style={{ left, top }}>
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
