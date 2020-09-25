import 'normalize.css/normalize.css'
import '../styles/globals.scss'
import 'react-multi-carousel/lib/styles.css'

import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFD881',
    },
    secondary: {
      main: '#407E83'
    },
  },
});


function MyApp({Component, pageProps}) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Component
          {...
            pageProps
          }
        />
        {/*<CssBaseline/>*/}
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
