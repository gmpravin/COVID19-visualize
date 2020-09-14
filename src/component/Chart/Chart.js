/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2";
const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});
  let underTreatment = null;
  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchApi();
  }, []);
  if (dailyData.length) {
    underTreatment = confirmed.value - (recovered.value + deaths.value);
  }
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) =>
          new Date(reportDate).toDateString()
        ),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#9C27B0",
            fill: true
          },

          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            backgroundColor: "#D81B60",
            fill: true
          }
        ]
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths", "Under Medical Treatment"],
        datasets: [
          {
            labels: [
              "Infected",
              "Recovered",
              "Deaths",
              "Under Medical Treatment"
            ],
            backgroundColor: ["#9C27B0", "#4CAF50", "#D81860", "orange"],
            data: [
              confirmed.value,
              recovered.value,
              deaths.value,
              underTreatment
            ]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
