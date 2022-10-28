import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "photographer",
  clientId: "photographer-admin",
});

export default keycloak;
