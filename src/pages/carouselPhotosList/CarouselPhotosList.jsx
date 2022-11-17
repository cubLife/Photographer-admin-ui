import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./carouselPhotosList.scss";
import axios from "axios";
import AlbumPhotos from "../../components/photoAlbum/AlbumPhotos";

const CarouselPhotosList = () => {
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${BASE_URL}/carousel-images/list`
        );
        setData(response._embedded.carouselImageDtoList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="photosList">
      <Sidebar />
      <div className="listContainer">
        <h1 className="title">Carousel Images</h1>
        <AlbumPhotos
          photos={data}
          rootUrl={`${BASE_URL}/api/carousel-images`}
        />
      </div>
    </div>
  );
};

export default CarouselPhotosList;
