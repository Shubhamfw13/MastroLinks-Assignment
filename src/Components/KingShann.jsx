import React, { createContext, useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import falconContext from "../Routes/Routes";

const KingShann = () => {
  const [planet, setPlanet] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(["", "", "", ""]);
  const [selectedVehicle, setSelectedVehicle] = useState(["", "", "", ""]);
  const [token, setToken] = useState("");
  const [time, setTime] = useState(0);
  const [findFalcon, setFindFalcon] = useState([]);
  const context = useContext(falconContext);
  const navigate = useNavigate();

  const getPlanet = () => {
    axios.get("https://findfalcone.herokuapp.com/planets").then((res) => {
      setPlanet(res.data);
    });
  };
  const getVehicle = () => {
    axios.get("https://findfalcone.herokuapp.com/vehicles").then((res) => {
      setVehicle(res.data);
    });
  };
  const getToken = () => {
    axios
      .post(
        "https://findfalcone.herokuapp.com/token",
        {},
        { headers: { Accept: "application/json" } }
      )
      .then((res) => {
        setToken(res.data.token);
      });
  };

  const findFalcone = () => {
    axios
      .post(
        "https://findfalcone.herokuapp.com/find",
        {
          token,
          planet_names: selectedPlanet,
          vehicle_names: selectedVehicle,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setFindFalcon(res.data.planet_name);
        context.setPlanet(findFalcon);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPlanet();
    getVehicle();
    getToken();
  }, []);

  const handleSelectedPlanet = (index, value) => {
    const temp = [...selectedPlanet];
    temp[index] = value;
    setSelectedPlanet(temp);
  };
  const handleSelectedVehicle = (index, value) => {
    const temp = [...selectedVehicle];
    temp[index] = value;
    setSelectedVehicle(temp);
    const distance = planet[index].distance;
    const speed = vehicle[index].speed;
    setTime(time + distance / speed);
  };

  return (
    <div>
      {planet.map((planet_, index) =>
        index < 4 ? (
          <>
            <select
              value={selectedPlanet[index]}
              onChange={(e) => handleSelectedPlanet(index, e.target.value)}
              name=""
              id=""
            >
              <option value="">Select</option>
              {planet.map((planet) => (
                <option
                  value={planet.name}
                  disabled={selectedPlanet.find(
                    (selected_planet) => selected_planet == planet.name
                  )}
                >
                  {planet.name}
                </option>
              ))}
            </select>
            {selectedPlanet[index] != "" && (
              <div>
                {" "}
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Spaceship
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedVehicle[index]}
                    onChange={(e) =>
                      handleSelectedVehicle(index, e.target.value)
                    }
                    name="radio-buttons-group "
                  >
                    {vehicle.map((vehicle) => (
                      <FormControlLabel
                        value={vehicle.name}
                        control={<Radio />}
                        label={`${vehicle.name}  (${vehicle.total_no})`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </>
        ) : null
      )}
      <button onClick={findFalcone}>Find Falcone</button>
      <br />
      <h3>{`Time Taken ${time}`}</h3>
      <h3>Planet Found {findFalcon}</h3>
    </div>
  );
};

export default KingShann;
