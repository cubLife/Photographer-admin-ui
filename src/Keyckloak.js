import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://sequre.na-photo.pl/auth/",
  realm: "photographer",
  clientId: "photographer-admin",
});

export default keycloak;
