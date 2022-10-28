import React from "react";
import OrderList from "../../components/list/OrderList";
import ProfileInformation from "../../components/profileInformation/ProfileInformation";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <ProfileInformation />
        <div className="bottom">
          <h1 className="title">Orders</h1>
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
