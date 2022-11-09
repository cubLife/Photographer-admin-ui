import React, { useEffect, useState } from "react";
import Keycloak from "./Keyckloak";
import AppRouter from "./components/AppRouter";

function App() {
  const [keycloak, setKeyckloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const kc = Keycloak;
    kc.init({ onLoad: "login-required" }).then((authenticated) => {
      setKeyckloak(kc);
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
