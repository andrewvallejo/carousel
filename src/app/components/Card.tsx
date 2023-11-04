import React, { useState } from "react";

import styles from "./card.module.scss";
import { getCoordinates, convertPxToRem } from "../../utility/math";

export default function Card({ title, children, center, radius, theta }) {
  const { x: left, y: top } = getCoordinates(theta, radius);

  return (
    <div className={styles.card} style={{ left, top }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
