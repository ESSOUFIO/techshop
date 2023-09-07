import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Charts.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Red dsdd dsd",
    "Blue dsds sdsds",
    "Yellow dsds dsdsd",
    "Green sddd dsds",
  ],
  datasets: [
    {
      label: "Number of Sales",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.3)",
        "rgba(54, 162, 235, 0.3)",
        "rgba(255, 206, 86, 0.3)",
        "rgba(75, 192, 192, 0.3)",
        "rgba(153, 102, 255, 0.3)",
        "rgba(255, 159, 64, 0.3)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function DoughnutChart() {
  return (
    <div className={styles.chart}>
      <h4>Best Selling Products</h4>
      <Doughnut id="doughnutChart" data={data} />
    </div>
  );
}
