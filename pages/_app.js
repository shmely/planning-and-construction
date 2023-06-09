import {AppContextProider } from '../context/app-context';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProider>
  );
}

export default MyApp;