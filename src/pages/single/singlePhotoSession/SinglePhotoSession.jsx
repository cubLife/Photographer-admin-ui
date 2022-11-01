import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AlbumDataTable from "../../../components/dataTables/AlbumDataTable";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./singlePhotoSession.scss";

const SinglePhotoSession = () => {
  const sessionId = sessionStorage.getItem("sessionId");

  return (
    <div>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <AlbumDataTable sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
};

export default SinglePhotoSession;
