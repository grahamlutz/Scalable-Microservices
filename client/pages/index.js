import axios from "axios";

const Landing = ({currentUser}) => {
  console.log('currentUser: ', currentUser);
  return <h1>Landing Page</h1>
};

Landing.getInitialProps = async () => {
  
  if(typeof window === 'undefined') {
    // we're running on the server!
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          host: 'ticketing.dev'
        }
      }
    ).catch(err => console.log(err));

    return data;
  } else {
    // we're running on the browser!
    const { data } = await axios.get('/api/users/currentuser').catch(err => console.log(err));

    return data;
  }
}

export default Landing;