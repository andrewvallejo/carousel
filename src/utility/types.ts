// Utility
import { pokemonTypes, pokemonTypeMatrix } from "utility/pokemonTypes";

export const calculateEffectiveness = (
  attackType: PokemonType,
  defenceType: PokemonType,
) => {
  const typeEffectiveness = pokemonTypeMatrix[attackType]?.[defenceType];

  if (typeEffectiveness !== undefined) {
    return typeEffectiveness;
  } else {
    return 1;
  }
};

export const calculateAllEffectiveness = (currentType: PokemonType) => {
  return pokemonTypes.reduce((acc, type) => {
    const effectiveness = calculateEffectiveness(currentType, type);
    return { ...acc, [type]: effectiveness };
  }, {});
};

export const getAdjacentType = (
  currentType: PokemonType,
  direction: "next" | "previous",
) => {
  const currentIndex = pokemonTypes.indexOf(currentType);

  let adjacentIndex = 0;

  if (direction === "next") {
    adjacentIndex = (currentIndex + 1) % pokemonTypes.length;
  } else if (direction === "previous") {
    adjacentIndex = currentIndex - 1;
    if (adjacentIndex < 0) {
      adjacentIndex = pokemonTypes.length - 1;
    }
  }

  return pokemonTypes[adjacentIndex];
};
