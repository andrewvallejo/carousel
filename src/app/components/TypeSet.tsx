//Components
import { TypeBlock } from "components/TypeBlock";
// Utilities
import { calculateAllEffectiveness } from "utility/types";
// Styles
import styles from "./TypeSet.module.scss";

interface TypeSetProps {
  types: PokemonType[];
  currentType: PokemonType;
  flip?: boolean; // Add this line
}
export function TypeSet({ types, currentType, flip }: TypeSetProps) {
  const typeMatrix = calculateAllEffectiveness(currentType);

  const rows = [types.slice(0, 4), types.slice(4, 7), types.slice(7, 9)];

  return (
    <div className={`${styles["type-set"]} ${flip ? styles["set-2"] : ""}`}>
      {rows.map((row, index) => (
        <ul
          key={index}
          className={`${styles.row} ${styles[`row-${index + 1}`]}`}
        >
          {row.map((type) => (
            <TypeBlock
              key={type}
              type={type}
              effectiveness={typeMatrix[type as keyof typeof typeMatrix]}
            />
          ))}
        </ul>
      ))}
    </div>
  );
}
