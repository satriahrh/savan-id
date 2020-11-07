import {
  AppBar,
  Button,
  Container,
  Grid,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Modal,
  Paper,
  ListItemIcon,
  ListItemText,
  IconButton,
  SvgIcon,
  Toolbar,
  Tooltip,
  Typography,
  InputBase, useTheme, FormControl, InputLabel, Select, Input, MenuItem,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {useEffect, useState} from "react";
import SavanBabyIcon from "../../components/icons/savan-baby-icon";
import ShopeeIcon from "../../components/icons/shopee-icon";
import HandshakeIcon from "../../components/icons/handshake-icon";
import getConfig from "next/dist/next-server/lib/runtime-config";
import search from "../../pages/search";
import {useRouter} from "next/router";
import Link from 'next/link'
import SavanLogoIcon from "../icons/savan-logo-icon";

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
    height: '100%',
    width: '100%',
  },
  primaryIcon: {
    width: 'auto',
  },
  searchBarRoot: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'row',
  },
  searchBarIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
  },
  searchBarInputBaseRoot: {
    height: '100%',
    width: '100%',
  },
  searchBarInputBaseInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '24ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row-reverse',
    height: '100%',
    width: '100%',
  }
}));

const BRAND = {
  'fluffy': 'Fluffy Baby Wear',
};

const CATEGORY = {
  'setelan': 'Setelan',
  'sleepsuit': 'Sleepsuit',
  'jumper': 'Jumper',
};

const SORT_BY = {
  'popularity': 'popularitas',
  '-date': 'waktu rilis terbaru',
  'date': 'waktu rilis terlama',
  '-price': 'harga termurah',
  'price': 'harga termahal',
};

export default function NavigationAppBar({givenFilter}) {
  const [filter, setFilter] = useState({q: '', page: 1, brands: [], categories: [], sortBy: 'popularity', state: 0});
  const filterHandleChange = (event) => {
    event.persist();
    if (event.target.name !== null) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [event.target.name]: event.target.value,
        state: 3,
      }));
    }
  };
  const filterHandleApply = () => {
    searchBarFilterHandleClose();
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      state: 1,
    }))
  };
  const theme = useTheme();
  const [searchBarFilterIsOpen, setSearchBarFilterIsOpen] = useState(false);
  const searchBarFilterToggle = () => {
    setSearchBarFilterIsOpen((prevState) => {
      if (prevState) {
        return false
      } else {
        return true
      }
    })
  };
  const searchBarFilterHandleClose = () => {
    setSearchBarFilterIsOpen(false);
  };
  const {publicRuntimeConfig} = getConfig();
  const router = useRouter();
  NavigationAppBar.getInitialProps = ({query}) => {
    return {query}
  };

  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  useEffect(() => {
    if (givenFilter && filter !== givenFilter) {
      setFilter(givenFilter)
    }
  }, [givenFilter, setFilter]);
  useEffect(() => {
    if (filter.state === 1) {
      router.push({
        pathname: `${publicRuntimeConfig.url.search}`,
        query: filter
      });
    }
  }, [filter.state]);

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
            <form
              className={classes.searchBarRoot}
              method='get'
              action={publicRuntimeConfig.url.search}
            >
              <SearchIcon className={classes.searchBarIcon}/>
              <InputBase
                name='q'
                classes={{
                  root: classes.searchBarInputBaseRoot,
                  input: classes.searchBarInputBaseInput
                }}
                placeholder='boleh kak, mau cari apa?'
                value={filter.q}
                onChange={(e) => {
                  e.persist();
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    q: e.target.value,
                  }))
                }}
              />
              <IconButton onClick={searchBarFilterToggle}>
                <ArrowDropDownIcon/>
              </IconButton>
            </form>
            <Hidden xsDown>
              <div className={classes.navigation}>

              </div>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <Modal
        open={searchBarFilterIsOpen}
        onClose={searchBarFilterHandleClose}
      >
        <Paper
          elevation={5}
          component={Container}
          square
          style={{
            marginTop: theme.spacing(8)
          }}
        >
          <Grid
            container
            component={Container}
            direction='column'
            style={{
              paddingTop: theme.spacing(4),
              paddingBottom: theme.spacing(2),
            }}
          >
            <GridFormControl>
              <FormControl>
                <InputLabel htmlFor='brand-select'>Brand</InputLabel>
                <Select
                  multiple
                  value={filter.brands}
                  onChange={filterHandleChange}
                  inputProps={{
                    name: 'brands',
                    id: 'brand-select',
                  }}
                  input={<Input/>}
                  className={classes.formControlBaseSelectRoot}
                >
                  {Object.keys(BRAND).map((value) => (
                    <MenuItem key={value} value={value}>{BRAND[value]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridFormControl>
            <GridFormControl>
              <FormControl className={classes.formControlBaseRoot}>
                <InputLabel htmlFor='category-select'>Kategori</InputLabel>
                <Select
                  multiple
                  value={filter.categories}
                  onChange={filterHandleChange}
                  inputProps={{
                    name: 'categories',
                    id: 'category-select',
                  }}
                  input={<Input/>}
                  className={classes.formControlBaseSelectRoot}
                >
                  {Object.keys(CATEGORY).map((value) => (
                    <MenuItem key={value} value={value}>{CATEGORY[value]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridFormControl>
            <GridFormControl>
              <FormControl className={classes.formControlBaseRoot}>
                <InputLabel htmlFor="sort-by-select">Urutan</InputLabel>
                <Select
                  value={filter.sortBy}
                  onChange={filterHandleChange}
                  inputProps={{
                    name: 'sortBy',
                    id: 'sort-by-select',
                  }}
                  className={classes.formControlBaseSelectRoot}
                >
                  {Object.keys(SORT_BY).map((value) => (
                    <MenuItem key={value} value={value}>{SORT_BY[value]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridFormControl>
            <GridFormControl>
              <Button
                variant='outlined'
                className={classes.filterButton}
                onClick={filterHandleApply}
                disabled={filter.state !== 3}
              >Terapkan</Button>
            </GridFormControl>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
}


function GridFormControl(props) {
  return (
    <Grid item
          xs={12}
          {...props}
    >
    </Grid>
  )
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function onSubmitSearch() {

}