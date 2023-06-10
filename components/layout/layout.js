import { Fragment, Suspense, useContext, useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MainNavigation from './main-navigation';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Collapse } from '@mui/material';

import AppContext from '../../context/app-context';


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function Layout(props) {
  const { message, showMessage } = useContext(AppContext);
  const [type,setType]=useState('error');
  const [text,setText]=useState('');
  useEffect(() => {
    if (message) {
      setType(message.type);
      setText(message.text);
    }
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false  
      if (message) {        
        showMessage(undefined);
      }    
      
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }

  }, [message]);



  return (
    <Fragment>
      <CacheProvider value={cacheRtl}>
        <MainNavigation />
        <Suspense fallback={<CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />}>
          <main>{props.children}</main>
        </Suspense>
        <Collapse in={message !== undefined}>
          <Alert sx={{ position: 'fixed', bottom: '50px', minWidth: '300px', right: '50px' }} severity={type}>
            {text}
          </Alert>
        </Collapse>
      </CacheProvider>
    </Fragment >
  );
}

export default Layout;