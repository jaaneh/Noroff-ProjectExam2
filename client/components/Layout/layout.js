import React from 'react';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../Header/header';
import Footer from '../Footer/footer';

import theme from '../../styles/theme';

const Layout = props => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Header />
          <main className='main' id='main'>
            {props.children}
          </main>
          <Footer />
        </StylesProvider>
      </ThemeProvider>
      <style jsx>{`
        .main {
          margin-top: 64px;
          padding-bottom: 150px;
        }
      `}</style>
    </>
  );
};

export default Layout;
