import { Fragment } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MainNavigation from './main-navigation';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function Layout(props) {
  return (
    <Fragment>
      <CacheProvider value={cacheRtl}>
        <MainNavigation />
        <main>{props.children}</main>
      </CacheProvider>
    </Fragment >
  );
}

export default Layout;