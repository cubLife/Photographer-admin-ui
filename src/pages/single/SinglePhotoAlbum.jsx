import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useLocation } from "react-router-dom";
import AlbumPhotos from "../../components/photoAlbum/AlbumPhotos";
import axios from "axios";

const SinglePhotoAlbum = () => {
  const location = useLocation();
  const { url } = location.state;
  const { albumId } = location.state;
  const { name } = location.state;
  console.log(name);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(url.photos.href);
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
