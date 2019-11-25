import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import cookie from 'js-cookie';
import NextNprogress from 'nextjs-progressbar';

import AuthContext from '../contexts/AuthContext';
import { validateToken } from '../lib/api';

const MyApp = props => {
  const { Component, pageProps } = props;
  const [ isAuth, setAuth ] = useState(false);
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
      <Head>
        <title>Holidaze - A hotel booking site.</title>
      </Head>
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          signIn: signIn,
          logOut: logOut
        }}
      >
        <NextNprogress
          color='#29D'
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{
            parent: '#main',
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
