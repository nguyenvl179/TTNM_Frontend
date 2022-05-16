import React from "react";
import Masonry from "react-masonry-css";
import CardAnimal from "../Animal/CardAnimal";
import "./style.css";
export default function GridViewAnimal({ animals }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {animals ? (
          animals.map((animal, index) => (
            <CardAnimal animal={animal} key={index} />
          ))
        ) : (
          <>
            <CardAnimal />
            <CardAnimal />
            <CardAnimal />
            <CardAnimal />
            <CardAnimal />
          </>
        )}
      </Masonry>
    </>
  );
}
