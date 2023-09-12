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
  const [revenues, setRevenues] = useState([]);

  const toMonth = (date) => {
    const dt = new Date(date);
    let month = String(dt.getMonth() + 1);
    month = month.length === 1 ? "0" + month : month;
    return dt.getFullYear() + "" + month;
  };

  const toMonthLetter = (monthNumber) => {
    switch (monthNumber) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "err";
    }
  };

  const prevMonth = (date) => {
    let month = date.substring(4, 6);
    let year = date.substring(0, 4);
    month--;
    month = month.toString();

    if (month === "0") {
      month = "12";
      year--;
    }
    month = month.length === 1 ? "0" + month : month;
    return year + "" + month;
  };

  //Revenue last 7 months
  useEffect(() => {
    let sortedOrders = Array.from(orders);
    let revenue = [];
    let nbrMonths = 12;

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
      let thisMonth = toMonth(today);

      sortedOrders.every((order) => {
        const dt = new Date(order.orderDate);
        const orderMonth = toMonth(dt);

        if (thisMonth === orderMonth) {
          pushOrder({ month: orderMonth, amount: order.amount });
        } else {
          while (thisMonth >= orderMonth) {
            thisMonth = prevMonth(thisMonth);
            nbrMonths--;
            if (nbrMonths === 0) {
              return false;
            }

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
      setRevenues(revenue);
    };
    if (orders.length !== 0) {
      sortArray();
    }
  }, [orders]);

  const data = {
    labels: revenues.map((item) => toMonthLetter(item.month.substring(4, 6))),
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
