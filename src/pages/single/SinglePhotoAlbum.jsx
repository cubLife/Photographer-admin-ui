import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useLocation } from "react-router";
import AlbumPhotos from "../../components/photoAlbum/AlbumPhotos";
import axios from "axios";

const SinglePhotoAlbum = () => {
  const storageData = JSON.parse(sessionStorage.getItem("singleAlbum"));
  const photosUrl = JSON.parse(storageData.photosUrl);
  const albumId = storageData.albumId;
  const name = storageData.name;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(photosUrl.photos.href);
        setData(response._embedded.photoDtoList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <h1 className="title">{`${name} Photo Album`}</h1>
        <AlbumPhotos
          photos={data}
          albumId={albumId}
          rootUrl="http://localhost:8081/api/photos"
        />
      </div>
    </div>
  );
};

export default SinglePhotoAlbum;
