import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import keycloak from "../../Keyckloak";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Natadmin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Costumers</span>
            </li>
          </Link>
          <Link to="/photo-sessions" style={{ textDecoration: "none" }}>
            <li>
              <LocalSeeOutlinedIcon className="icon" />
              <span>Photo sessions</span>
            </li>
          </Link>
          <Link to="/photo-session-packages" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentOutlinedIcon className="icon" />
              <span>Session package</span>
            </li>
          </Link>
          <Link to="/carousel-photos" style={{ textDecoration: "none" }}>
            <li>
              <RepeatOutlinedIcon className="icon" />
              <span>Carousel photos</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/feedbacks" style={{ textDecoration: "none" }}>
            <li>
              <ThumbUpAltOutlinedIcon className="icon" />
              <span>Feedbacks</span>
            </li>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li
            onClick={() => {
              keycloak.logout();
            }}
          >
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
