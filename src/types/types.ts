declare global {
  type TypeMatrix = { [type: string]: number };
  type PokemonType =
    | "normal"
    | "fire"
    | "water"
    | "electric"
    | "grass"
    | "ice"
    | "fighting"
    | "poison"
    | "ground"
    | "flying"
    | "psychic"
    | "bug"
    | "rock"
    | "ghost"
    | "dragon"
    | "dark"
    | "steel"
    | "fairy";
  type PokemonTypeColors = Record<PokemonType, string>;
  type PokemonTypeMatrix = { [type in PokemonType]: TypeMatrix };
}

export {};
