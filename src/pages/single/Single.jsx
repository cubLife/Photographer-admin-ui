import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useLocation } from "react-router-dom";
import AlbumPhotos from "../../components/photoAlbum/AlbumPhotos";

const Single = () => {
  const location = useLocation();
  const { url } = location.state;
  const { albumId } = location.state;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <AlbumPhotos photosUrl={url.photos.href} albumId={albumId} />
      </div>
    </div>
  );
};

export default Single;
