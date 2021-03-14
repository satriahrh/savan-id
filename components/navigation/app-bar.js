import {
  AppBar,
  Button,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Link from 'next/link';
import SavanLogoIcon from '../icons/savan-logo-icon';
import FilterDrawer from './filter-drawer';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    // minHeight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%'
  },
  primaryIcon: {
    width: 'auto'
  },
  navigation: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between'
  }
}));

export default function NavigationAppBar({ givenFilter }) {
  const theme = useTheme();
  NavigationAppBar.getInitialProps = ({ query }) => {
    return { query };
  };

  const classes = useStyles();

  return (
    <div
      style={{
        height: theme.spacing(8)
      }}>
      <AppBar position="fixed" color="default">
        <Toolbar className={classes.toolbar} component={Container}>
          <div className={classes.flexContainer}>
            <Hidden xsDown>
              <Link href="/" passHref>
                <Button>
                  <SavanLogoIcon className={classes.primaryIcon} />
                </Button>
              </Link>
            </Hidden>
            <Hidden smUp>
              <IconButton>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <FilterDrawer givenFilter={givenFilter} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
