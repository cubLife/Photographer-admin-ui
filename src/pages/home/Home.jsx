import React, { useEffect, useState } from "react";
import OrderList from "../../components/list/OrderList";
import Calendar from "../../components/calendar/Calendar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="top">
          <div className="leftContainer">left</div>
          <div className="rightContainer">
            <Calendar />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">New Orders</h1>
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default Home;
