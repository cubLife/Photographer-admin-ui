import React from "react";
import { useLocation } from "react-router-dom";
import AlbumDataTable from "../../../components/dataTables/AlbumDataTable";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./singlePhotoSession.scss";

const SinglePhotoSession = () => {
  const location = useLocation();
  const id = location.state;
  if (id) {
    sessionStorage.setItem("id", id);
  }

  return (
    <div>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <AlbumDataTable sessionId={sessionStorage.getItem("id")} />
        </div>
      </div>
    </div>
  );
};

export default SinglePhotoSession;
