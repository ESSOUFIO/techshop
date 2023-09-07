import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Charts.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ bestProds, prodNames }) {
  const data = {
    labels: prodNames,
    datasets: [
      {
        label: "Number of Sales",
        data: bestProds,
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(170, 45, 237, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(99, 237, 45, 0.3)",
          "rgba(231, 237, 45, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(170, 45, 237, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(99, 237, 45, 1)",
          "rgba(231, 237, 45, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <h4>Best Selling Products</h4>
      <Doughnut id="doughnutChart" data={data} />
    </div>
  );
}
