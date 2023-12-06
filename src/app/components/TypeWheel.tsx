// Packages
import { useEffect, useRef, useState } from "react";
// Components
import { TypeSelection } from "components/TypeSelection";
// Hooks
import { useRotation } from "hooks/useRotation";
// Utility
import { multiplyByPi } from "utility/math";
import { pokemonTypes } from "utility/pokemonTypes";
// Styles
import styles from "./TypeWheel.module.scss";

export const TypeWheel = ({
  setSelectedType,
  selectedType,
}: {
  setSelectedType: (value: PokemonType) => void;
  selectedType: PokemonType;
}) => {
  const [loaded, setLoaded] = useState(false);

  const wheelRef = useRef<HTMLDivElement>(null);

  const { wheel, setWheel } = useRotation({
    wheelRef,
    types: pokemonTypes,
    setSelectedType,
    selectedType,
  });

  useEffect(() => {
    if (!wheelRef.current) return;

    const { width, height } = wheelRef.current.getBoundingClientRect();

    let radius = 380 / 2;
    if (window.innerWidth <= 480) {
      radius = 300 / 2;
    }

    const center = { x: width / 2, y: height / 2 };
    const initialTheta = 10;

    setWheel((prevWheel: IWheel) => ({
      ...prevWheel,
      center,
      radius,
      theta: initialTheta,
    }));

    setLoaded(true);
  }, [setWheel, wheelRef]);

  return (
    <div className={styles["type-wheel__container"]}>
      <div ref={wheelRef} className={styles["type-wheel__inner"]}>
        {loaded &&
          pokemonTypes.map((type: string, index: number) => {
            return (
              <TypeSelection
                key={type}
                type={type}
                center={wheel.center}
                radius={wheel.radius}
                theta={multiplyByPi(index)}
                isSelected={selectedType === pokemonTypes[index]}
              />
            );
          })}
      </div>
    </div>
  );
};
