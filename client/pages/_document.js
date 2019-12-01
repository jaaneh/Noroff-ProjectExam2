import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <>
        <html lang='en'>
          <Head>
            <meta
              name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
            />
            <meta name='theme-color' content={theme.palette.primary.main} />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
        <style jsx global>{`
          @font-face {
            font-family: 'Open Sans';
            src: url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap');
          }
        `}</style>
      </>
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
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
