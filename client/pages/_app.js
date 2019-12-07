import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import NextNprogress from 'nextjs-progressbar';

import AuthContext from '../contexts/AuthContext';
import { validateToken } from '../lib/api';

const MyApp = props => {
  const { Component, pageProps } = props;
  const [ isAuth, setAuth ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const token = cookie.get('token');

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    autoRun();
  }, [ token ]);

  const autoRun = async () => {
    if (token) {
      const valid = await validateToken(token);
      if (valid === true) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } else {
      setAuth(false);
    }
  };

  const forceUpdate = () => {
    setUpdate(!update);
  };

  const signIn = () => {
    setAuth(true);
    Router.push('/admin');
  };

  const logOut = () => {
    cookie.remove('token');
    setAuth(false);
    Router.push('/login');
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          signIn: signIn,
          logOut: logOut,
          update: update,
          forceUpdate: forceUpdate
        }}
      >
        <NextNprogress
          color='#29D'
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{
            parent: '#main',
            showSpinner: false,
            easing: 'ease',
            speed: 500
          }}
        />
        <Component {...pageProps} />
      </AuthContext.Provider>
      <style jsx global>{`
        #__next {
          position: relative;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default MyApp;
