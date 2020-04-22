import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api";
import styls from "./CountryPicker.module.css";
const CountryPicker = ({ handleCountryChange }) => {
  const [fetchCountry, setFetchCountry] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      setFetchCountry(await fetchCountries());
    };
    fetchdata();
  }, [setFetchCountry]);

  console.log(fetchCountry);

  return (
    <div className={styls.CountryPick}>
      {
        <select onChange={e => handleCountryChange(e.target.value)}>
          <option value="">Global</option>
          {fetchCountry.map((i, index) => (
            <option value={i.name} key={index}>
              {i.name}
            </option>
          ))}
        </select>
      }
    </div>
  );
};

export default CountryPicker;
