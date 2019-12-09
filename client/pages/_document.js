import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='en'>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
          <meta name='theme-color' content={theme.palette.primary.main} />
          <meta name='description' content='The quick and easy way to book a hotel for your holiday. Our experts will help you find the hotel of your dreams.' />
          <meta name='keywords' content='holidaze, hotel, booking, establishment, establishments, holiday, book hotel, vacation' />
          <meta property='og:site_name' content='Holidaze - The quick and easy way to book a hotel for your holiday.' />
          <meta property='og:title' content='Holidaze - A hotel booking site' />
          <meta property='og:type' content='website' />
          <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap' rel='stylesheet'></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [ ...React.Children.toArray(initialProps.styles), sheets.getStyleElement() ]
  };
};
