import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>Hello, {currentUser.email}</h1>
      <Component {...pageProps} />
    </div>
  )
};

// "appContenxt" if different in AppComponent as opposed to individual pages.
// just a bit of next trivia.
AppComponent.getInitialProps = async (appContext) => {

  const { data } = await buildClient(appContext.ctx).get('/api/users/currentuser');
  
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  
  return {
    pageProps,
    ...data
  };
}

export default AppComponent;