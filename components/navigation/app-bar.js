import {
  AppBar,
  Button,
  Container,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  useTheme,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import React, {useState} from "react";
import Link from 'next/link'
import SavanLogoIcon from "../icons/savan-logo-icon";
import FilterDrawer from "./filter-drawer";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    // minHeight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  primaryIcon: {
    width: 'auto',
  },
  navigation: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between'
  },
  navSearch: {
    textTransform: 'none',
    fontWeight: 400,
  }
}));

export default function NavigationAppBar({givenFilter}) {
  const theme = useTheme();
  const [searchBarFilterIsOpen, setSearchBarFilterIsOpen] = useState(false);
  const searchBarFilterToggle = () => {
    setSearchBarFilterIsOpen((prevState) => {
      return !prevState;
    })
  };
  NavigationAppBar.getInitialProps = ({query}) => {
    return {query}
  };

  const classes = useStyles();

  return (
    <div style={{
      height: theme.spacing(8)
    }}>
      <AppBar position="fixed" color='default'>
        <Toolbar className={classes.toolbar} component={Container}>
          <div className={classes.flexContainer}>
            <Hidden xsDown>
              <Link href='/' passHref>
                <Button>
                  <SavanLogoIcon className={classes.primaryIcon}/>
                </Button>
              </Link>
            </Hidden>
            <Hidden smUp>
              <IconButton>
                <MenuIcon/>
              </IconButton>
            </Hidden>
            <Button
              onClick={searchBarFilterToggle}
              className={classes.navSearch}
              variant='outlined'
            >
              <SearchIcon/>Boleh kakak, mau cari apa?
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <FilterDrawer isOpen={searchBarFilterIsOpen} setIsOpen={setSearchBarFilterIsOpen} givenFilter={givenFilter}/>
    </div>
  );
}
