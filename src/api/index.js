import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let changeurl = url;
  if (country) {
    changeurl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changeurl);

    const ModifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    };

    return ModifiedData;
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const ModifiedData = data.map(i => ({
      confirmed: i.confirmed.total,
      reportDate: i.reportDate,
      deaths: i.deaths.total
    }));
    return ModifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);

    return countries;
  } catch (error) {}
};
