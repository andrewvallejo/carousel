// Utilities
import { typeColors } from "utility/pokemonTypes";
// Styles
import styles from "./TypeBlock.module.scss";

interface TypeBlockProps {
  type: string;
  effectiveness?: string;
}

export function TypeBlock({ type, effectiveness }: TypeBlockProps) {
  const color = typeColors[type as keyof typeof typeColors];
  return (
    <li
      className={styles["type-block"]}
      style={{ "--color": color } as React.CSSProperties}
    >
      <h2>{type}</h2>
      <h3>{effectiveness}</h3>
    </li>
  );
}
