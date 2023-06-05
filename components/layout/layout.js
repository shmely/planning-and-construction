import { Fragment, Suspense } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MainNavigation from './main-navigation';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import CircularProgress from '@mui/material/CircularProgress';



const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function Layout(props) {
  return (
    <Fragment>
      <CacheProvider value={cacheRtl}>
        <MainNavigation />
        <Suspense fallback={<CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />}>
          <main>{props.children}</main>
        </Suspense>
      </CacheProvider>
    </Fragment >
  );
}

export default Layout;