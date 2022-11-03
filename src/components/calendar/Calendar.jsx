import React, { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { daySource, weekSource, monthSource } from "../../CalendarSource";
import axios from "axios";
const Calendar = () => {
  const [orders, setOrders] = useState([]);

  const getFormData = () => {
    const formData = new FormData();
    formData.append("status", "approved");
    return formData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8081/api/orders/order-status/approved/list",
          {
            headers: window.$token,
          }
        );
        setOrders(response._embedded.orderDtoList);
      } catch (error) {
        console.error(error);
        setOrders({});
      }
    };

    fetchData();
  }, []);

  const getEvents = () => {
    const events = [];
    if (!orders.length) {
      return events;
    } else {
      orders.map((order) =>
        events.push({
          title: order.photoSessionName,
          start: new Date(order.startTime),
          end: new Date(order.endTime),
        })
      );
      return events;
    }
  };

  return (
    <div>
      <Scheduler
        height={300}
        view="month"
        day={daySource}
        week={weekSource}
        month={monthSource}
        events={getEvents()}
      />
    </div>
  );
};

export default Calendar;
