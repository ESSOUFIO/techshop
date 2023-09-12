import React from "react";
import styles from "./Charts.module.scss";
import "./charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["Order Placed", "Processing", "Shipped", "Delivered"];

const OrderStatus = ({ orderCounts }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Order Count",
        data: orderCounts,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <h4>Orders Status</h4>
      <Bar id="barChart" options={options} data={data} />
    </div>
  );
};

export default OrderStatus;
