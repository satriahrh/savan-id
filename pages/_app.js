import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css/normalize.css';
import '../styles/globals.scss';
import 'react-multi-carousel/lib/styles.css';

import { ThemeProvider } from '@material-ui/core/styles';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFD881'
    },
    secondary: {
      main: '#407E83'
    }
  }
});

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
};
function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        {/*<CssBaseline/>*/}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
