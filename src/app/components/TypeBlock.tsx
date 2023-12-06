// Utilities
import { typeColors } from "utility/pokemonTypes";
// Styles
import styles from "./TypeBlock.module.scss";
import { useEffect, useRef, useState } from "react";

interface TypeBlockProps {
  type: string;
  effectiveness?: string;
}

export function TypeBlock({ type, effectiveness }: TypeBlockProps) {
  const color = typeColors[type as keyof typeof typeColors];
  const effectivenessString = useRef("");
  const [delayedEffectiveness, setDelayedEffectiveness] = useState("");
  const [fadeClass, setFadeClass] = useState(styles.fadeOut);

  useEffect(() => {
    if (effectiveness) {
      effectivenessString.current = effectiveness;
    }
  }, [effectiveness]);

  useEffect(() => {
    setFadeClass(styles.fadeOut);
    const timer = setTimeout(() => {
      setDelayedEffectiveness(effectivenessString.current);
      setFadeClass(styles.fadeIn);
    }, 250);

    return () => clearTimeout(timer);
  }, [effectiveness]);
  return (
    <li
      className={styles["type-block"]}
      style={{ "--color": color } as React.CSSProperties}
    >
      <h2>{type}</h2>
      <h3 className={fadeClass}>{delayedEffectiveness || effectiveness}</h3>
    </li>
  );
}
