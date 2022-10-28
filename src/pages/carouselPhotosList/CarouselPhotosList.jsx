import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./carouselPhotosList.scss";
import axios from "axios";
import AlbumPhotos from "../../components/photoAlbum/AlbumPhotos";

const CarouselPhotosList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8081/api/carousel-images/list"
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
          rootUrl="http://localhost:8081/api/carousel-images"
        />
      </div>
    </div>
  );
};

export default CarouselPhotosList;
