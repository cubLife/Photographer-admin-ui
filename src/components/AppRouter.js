import React from "react";
import Home from "../pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "../pages/List/List";
import Single from "../pages/single/Single";
import New from "../pages/new/New";
import PhotosList from "../pages/carouselPhotosList/CarouselPhotosList";
import Profile from "../pages/profile/Profile";
import {
  photoAlbumInputs,
  photoSessionsInputs,
  photoSessionsPackageInputs,
} from "../FormSource";
import SinglePhotoAlbum from "../pages/single/SinglePhotoAlbum";
import Edit from "../pages/edit/Edit";
import EditOrder from "../pages/edit/EditOrder";
import NewPhotoSession from "../pages/new/NewPhotoSession";
import EditPhotoSession from "../pages/edit/EditPhotoSession";
import SinglePhotoSession from "../pages/single/singlePhotoSession/SinglePhotoSession";
import NewPhotoAlbum from "../pages/new/NewPhotoAlbum";

const AppRouter = ({ keycloak }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  window.$token = {
    Authorization: "Bearer " + keycloak.token,
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List dataTable="costumer" />} />
              <Route path=":userId" element={<Single />} />
            </Route>
            <Route path="photo-albums">
              <Route index element={<List dataTable="album" />} />
              <Route path=":photoAlbumId" element={<SinglePhotoAlbum />} />
              <Route
                path="new"
                element={
                  <NewPhotoAlbum
                    inputs={photoAlbumInputs}
                    title="Add new Photo album"
                    url={`${BASE_URL}/photo-albums`}
                  />
                }
              />
            </Route>
            <Route path="photo-sessions">
              <Route index element={<List dataTable="session" />} />
              <Route
                path="view/:photoSessionId"
                element={<SinglePhotoSession />}
              />
              <Route
                path=":photoSessionId"
                element={
                  <EditPhotoSession
                    inputs={photoSessionsInputs}
                    title="Edit Photo session"
                  />
                }
              />
              <Route
                path="new"
                element={
                  <NewPhotoSession
                    inputs={photoSessionsInputs}
                    title="Add new Photo session"
                    url={`${BASE_URL}/photo-sessions`}
                  />
                }
              />
            </Route>
            <Route path="photo-session-packages">
              <Route index element={<List dataTable="sessionPackage" />} />
              <Route
                path=":photoSessionsPackageId"
                element={
                  <Edit
                    inputs={photoSessionsPackageInputs}
                    title="Edit Photo session package"
                  />
                }
              />
              <Route
                path="new"
                element={
                  <New
                    inputs={photoSessionsPackageInputs}
                    title="Add new Photo session package"
                    url={`${BASE_URL}/photo-session-packages`}
                  />
                }
              />
            </Route>
            <Route path="carousel-photos">
              <Route index element={<PhotosList />} />
              <Route path=":carouselPhotosId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="orders">
              <Route index element={<List dataTable="order" />} />
              <Route
                path=":orderId"
                element={<EditOrder title="Edit Order" />}
              />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="feedbacks">
              <Route index element={<List dataTable="feedback" />} />
            </Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
