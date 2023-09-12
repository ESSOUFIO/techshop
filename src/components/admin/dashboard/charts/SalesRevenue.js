import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const SalesRevenue = ({ orders }) => {
  //   const [months, setMonths] = useState([
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //   ]);
  //   const [amounts, setAmounts] = useState([25, 30, 15, 56, 12, 14, 40]);
  const [revenues, setRevenues] = useState([]);

  //Revenue last 7 months
  useEffect(() => {
    let sortedOrders = Array.from(orders);
    let revenue = [];

    const pushOrder = (obj) => {
      const { month, amount } = obj;
      const index = revenue.findIndex((el) => el.month === month);
      if (index !== -1) {
        //found
        const lastAmount = revenue[index].amount;
        revenue[index] = { month: month, amount: lastAmount + amount };
      } else revenue.push(obj);
    };

    const sortArray = () => {
      sortedOrders.sort((a, b) => b.createdAt - a.createdAt);
      const today = new Date();
      let thisMonth = today.getMonth() + 1;
      let nbrMonths = 7;
      const lastMonth = thisMonth - nbrMonths;

      sortedOrders.every((order) => {
        const dt = new Date(order.orderDate);
        const orderMonth = dt.getMonth() + 1;

        if (thisMonth === orderMonth) {
          pushOrder({ month: orderMonth, amount: order.amount });
        } else {
          console.log(
            order.amount,
            "thisMonth: " + thisMonth,
            "orderMonth: " + orderMonth
          );
          while (thisMonth >= orderMonth) {
            thisMonth--;
            nbrMonths--;
            if (nbrMonths === 0) {
              return false;
            }
            console.log("nbrMonths in:", nbrMonths);
            if (thisMonth > orderMonth) {
              pushOrder({ month: thisMonth, amount: 0 });
            } else {
              pushOrder({ month: orderMonth, amount: order.amount });
              break;
            }
          }
        }
        return true;
      });

      //sort revenue
      revenue.sort((a, b) => a.month - b.month);

      console.log(sortedOrders);
      console.log(revenue);

      setRevenues(revenue);
    };
    if (orders.length !== 0) {
      sortArray();
    }
  }, [orders]);

  const data = {
    labels: revenues.map((item) => item.month),
    datasets: [
      {
        label: "Income (USD)",
        data: revenues.map((item) => item.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default SalesRevenue;
