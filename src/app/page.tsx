"use client";
//Packages
import { useEffect, useState } from "react";
//Components
import { TypeSet } from "components/TypeSet";
import { TypeWheel } from "components/TypeWheel";
// Utility
import { typeSet } from "utility/pokemonTypes";
// Styles
import styles from "./page.module.scss";

const initialType: PokemonType = "ice";

export default function Home() {
  // TODO: create a global context for type selections
  const [selectedType, setSelectedType] = useState<PokemonType>(initialType);

  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className={styles.main}>
      <TypeSet types={typeSet.oneToNine} currentType={selectedType} />
      <TypeWheel
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
      <TypeSet types={typeSet.tenToEighteen} currentType={selectedType} />
    </main>
  );
}
