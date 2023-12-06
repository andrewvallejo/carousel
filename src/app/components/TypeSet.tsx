//Components
import { TypeBlock } from "components/TypeBlock";
// Utilities
import { calculateAllEffectiveness } from "utility/types";
// Styles
import styles from "./TypeSet.module.scss";

interface TypeSetProps {
  types: PokemonType[];
  currentType: PokemonType;
}

export function TypeSet({ types, currentType }: TypeSetProps) {
  const typeMatrix = calculateAllEffectiveness(currentType);

  return (
    <ul className={styles["type-set"]}>
      {types.map((type) => {
        return (
          <TypeBlock
            key={type}
            type={type}
            effectiveness={typeMatrix[type as keyof typeof typeMatrix]}
          />
        );
      })}
    </ul>
  );
}
