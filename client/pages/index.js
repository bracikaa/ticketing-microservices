import axios from "axios";

const LandingPage = ({ currentUser }) => {
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    //when are on the server
    const response = await axios.get(
      "http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers
      }
    );

    return response.data;
  } else {
    // we are on the browser
    const response = await axios.get("/api/users/currentuser");
    return response.data;
  }

  return {};
};

export default LandingPage;
