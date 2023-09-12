import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Charts.module.scss";
import { useState } from "react";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const BestSelling = ({ orders }) => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const getSelledProducts = () => {
      let prodSelled = [];
      orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          prodSelled.push({
            name: item.name,
            quantity: item.quantity,
          });
        });
      });

      let prodSummary = [];
      let array = prodSelled;

      prodSelled.forEach((item, i) => {
        if (
          !prodSummary.some((el) => {
            return el.name === item.name;
          })
        ) {
          let qty = item.quantity;
          for (let j = i + 1; j < array.length; j++) {
            if (item.name === array[j].name) {
              qty += array[j].quantity;
            }
          }
          prodSummary.push({ name: item.name, quantity: qty });
        }
      });
      prodSummary.sort((a, b) => b.quantity - a.quantity);
      setBestProducts(prodSummary.slice(0, 5));
    };

    if (orders) getSelledProducts();
  }, [orders]);

  const data = {
    labels: bestProducts.map((item) => {
      return item.name.substring(0, 20) + "..";
    }),
    datasets: [
      {
        label: "Number of Sales",
        data: bestProducts.map((item) => item.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(170, 45, 237, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(99, 237, 45, 0.5)",
          "rgba(231, 237, 45, 0.5)",
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
};

export default BestSelling;
