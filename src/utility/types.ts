export const pokemonTypes = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const getAdjacentType = (
  currentType: string,
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
