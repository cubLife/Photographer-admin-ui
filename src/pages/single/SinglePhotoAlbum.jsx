import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import AlbumPhotos from "../../components/photoAlbum/AlbumPhotos";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SinglePhotoAlbum = () => {
  const location = useLocation();
  const state = location.state;

  if (state) {
    sessionStorage.setItem("state", JSON.stringify(state));
  }

  const storageData = JSON.parse(sessionStorage.getItem("state"));
  const photosUrl = JSON.parse(storageData.photosUrl);
  const albumId = storageData.albumId;
  const name = storageData.name;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(photosUrl.photos.href);
        setData(response._embedded.photoDtoList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
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
          loading={loading}
          photos={data}
          albumId={albumId}
          rootUrl={`${BASE_URL}/photos/list`}
        />
      </div>
    </div>
  );
};

export default SinglePhotoAlbum;
