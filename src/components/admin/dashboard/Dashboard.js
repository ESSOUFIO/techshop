import React from "react";
import styles from "./Dashboard.module.scss";
import InfoBox from "../infoBox/InfoBox";
import { TbReportMoney } from "react-icons/tb";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../redux/orderSlice";
import { useEffect } from "react";
import { useState } from "react";
import { selectProducts } from "../../../redux/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { BarChart } from "../../chart/BarChart";
import { DoughnutChart } from "../../chart/DoughnutChart";
import { LineChart } from "../../chart/LineChart";

const Dashboard = () => {
  const [earning, setEarning] = useState(0);
  const [bestProducts, setBestProducts] = useState([]);

  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);
  const users = useFetchCollection("users", "name");

  const countByStatus = (status) => {
    const array = orders.filter((order) => order.status === status);
    return array ? array.length : 0;
  };

  const placed = countByStatus("Order Placed");
  const processing = countByStatus("Processing");
  const shipped = countByStatus("Shipped");
  const delivered = countByStatus("Delivered");

  //Best Seller Products
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

  //Earnings
  useEffect(() => {
    let amount = 0;
    orders.forEach((order) => {
      amount += order.amount;
    });
    setEarning(Math.round(amount));
  }, [orders]);

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

      sortedOrders.forEach((order) => {
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
            if (thisMonth > orderMonth) {
              pushOrder({ month: thisMonth, amount: 0 });
            } else {
              pushOrder({ month: orderMonth, amount: order.amount });
              break;
            }
            thisMonth--;
          }
        }
      });
      console.log(sortedOrders);
      console.log(revenue);
    };
    if (orders.length !== 0) {
      sortArray();
    }
  }, [orders]);

  return (
    <div className={styles.dashboard}>
      <h5>Dashboard</h5>
      <div className={styles.infoBoxes}>
        <InfoBox
          name={"Earning"}
          value={`$${earning}`}
          color={"#AA1643"}
          icon={<TbReportMoney size={30} color="#AA1643" />}
        />

        <InfoBox
          name={"Orders"}
          value={orders.length}
          color={"#F9BB25"}
          icon={<BsFillCartCheckFill size={30} color="#F9BB25" />}
        />

        <InfoBox
          name={"Products"}
          value={products.length}
          color={"#52AB7D"}
          icon={<FaTags size={30} color="#52AB7D" />}
        />

        <InfoBox
          name={"Customers"}
          value={users.data.length}
          color={"#1F93FF"}
          icon={<HiUsers size={30} color="#1F93FF" />}
        />
      </div>
      <div className={styles.revenue}>
        <h4>Sales Revenue</h4>
        <LineChart
          revenue={[25, 30, 15, 56, 12, 14, 40]}
          months={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ]}
        />
      </div>

      <div className={styles.charts}>
        <BarChart orderCounts={[placed, processing, shipped, delivered]} />
        <DoughnutChart
          bestProds={bestProducts.map((item) => item.quantity)}
          prodNames={bestProducts.map((item) => {
            return item.name.substring(0, 20) + "..";
          })}
        />
      </div>
    </div>
  );
};

export default Dashboard;
