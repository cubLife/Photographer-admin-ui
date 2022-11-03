import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/List/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import PhotosList from "./pages/carouselPhotosList/CarouselPhotosList";
import Profile from "./pages/profile/Profile";
import {
  photoAlbumInputs,
  photoSessionsInputs,
  photoSessionsPackageInputs,
} from "./FormSource";
import SinglePhotoAlbum from "./pages/single/SinglePhotoAlbum";
import Edit from "./pages/edit/Edit";
import EditOrder from "./pages/edit/EditOrder";
import NewPhotoSession from "./pages/new/NewPhotoSession";
import EditPhotoSession from "./pages/edit/EditPhotoSession";
import SinglePhotoSession from "./pages/single/singlePhotoSession/SinglePhotoSession";
import NewPhotoAlbum from "./pages/new/NewPhotoAlbum";
import keycloac from "./Keyckloak";
import AppRouter from "./components/AppRouter";

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const _kc = keycloac;
    _kc.init({ onLoad: "login-required" }).then((authenticated) => {
      setKeycloak(_kc);
      setAuthenticated(authenticated);
    });
  }, []);

  if (keycloak) {
    if (authenticated) {
      return (
        <div>
          <AppRouter keycloak={keycloak} />
        </div>
      );
    } else return <div className="my-12">Unable to authenticate!</div>;
  }
}
export default App;
