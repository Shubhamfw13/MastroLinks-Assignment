import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import KingShann from "../Components/KingShann";
import PlanetFound from "../Components/PlanetFound";
export const falconContext = createContext();

const AllRoutes = () => {
  const [planet, setPlanet] = useState({});
  return (
    <div>
      <falconContext.Provider value={{ planet, setPlanet }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planetfound" element={<PlanetFound />} />
        </Routes>
      </falconContext.Provider>
    </div>
  );
};

export default AllRoutes;
