import React from "react";
import { useLocation } from "react-router-dom";
import AlbumDataTable from "../../../components/dataTables/AlbumDataTable";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./singlePhotoSession.scss";

const SinglePhotoSession = () => {
  const location = useLocation();
  const { url } = location.state;
  const { sessionId } = location.state;
  const { iconUrl } = location.state;
  const { name } = location.state;
  return (
    <div>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <h1 className="title">{name}</h1>
          <AlbumDataTable url={url} sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
};

export default SinglePhotoSession;
