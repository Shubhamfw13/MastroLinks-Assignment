import React, { useContext } from "react";
import { falconContext } from "../Routes/Routes";

const PlanetFound = () => {
  const context = useContext(falconContext);
  console.log(context.planet);

  return <div>PlanetFound</div>;
};

export default PlanetFound;
