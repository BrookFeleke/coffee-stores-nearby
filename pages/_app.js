import '../styles/globals.css';
import Head from 'next/head';
import StoreProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
