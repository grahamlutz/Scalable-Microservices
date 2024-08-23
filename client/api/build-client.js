import axios from "axios";

const buildClient = ({ req }) => {
  if(typeof window === 'undefined') {
    // we're running on the server!
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we're running on the browser!
    return axios.create({
      baseURL:'/'
    });
  }
};

export default buildClient;