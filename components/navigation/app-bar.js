import {
  AppBar,
  Button,
  Container,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  SvgIcon,
  Toolbar,
  Tooltip,
  Typography,
  InputBase,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {useEffect, useState} from "react";
import SavanIcon from "../../components/icons/savan-icon";
import ShopeeIcon from "../../components/icons/shopee-icon";
import HandshakeIcon from "../../components/icons/handshake-icon";
import getConfig from "next/dist/next-server/lib/runtime-config";
import search from "../../pages/baby/search";
import {useRouter} from "next/router";
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: '64px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: theme.palette.common.black
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

export default function NavigationAppBar({givenFilter}) {
  const [filter, setFilter] = useState({q: ''});
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color='default'>
        <Container>
          <Toolbar>
            <Hidden smUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => setDrawerIsOpen(true)}
              >
                <MenuIcon/>
              </IconButton>
              <Drawer anchor='top' open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
                <List>
                  <Link href='/baby' passHref>
                    <ListItemLink>
                      <ListItemIcon>
                        <SavanIcon/>
                      </ListItemIcon>
                      <ListItemText primary='Beranda'/>
                    </ListItemLink>
                  </Link>
                  <Link href={publicRuntimeConfig.url.shopee} passHref>
                    <ListItemLink>
                      <ListItemIcon>
                        <ShopeeIcon/>
                      </ListItemIcon>
                      <ListItemText primary='Shopee store'/>
                    </ListItemLink>
                  </Link>
                  <Divider/>
                  <Link href={publicRuntimeConfig.url.infoPartnership} passHref>
                    <ListItemLink>
                      <ListItemIcon>
                        <HandshakeIcon color='action'/>
                      </ListItemIcon>
                      <ListItemText primary='Kerja Sama'/>
                    </ListItemLink>
                  </Link>
                  <Link href={publicRuntimeConfig.url.infoGeneral} passHref>
                    <ListItemLink>
                      <ListItemIcon><                      ContactSupportIcon/></ListItemIcon>
                      <ListItemText>Informasi Umum</ListItemText>
                    </ListItemLink>
                  </Link>
                </List>
              </Drawer>
            </Hidden>
            <Hidden xsDown>
              <IconButton edge='start' onClick={() => {
                router.push('/baby')
              }}>
                <SavanIcon/>
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap component='a'>
                Savan Baby W
              </Typography>
            </Hidden>
            <form className={classes.search} onSubmit={(e) => {
              router.push({
                pathname: `${publicRuntimeConfig.url.search}`,
                query: filter
              });
              e.preventDefault()
            }}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                value={filter.q}
                onChange={(e) => {
                  e.persist();
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    q: e.target.value,
                  }))
                }}
              />
            </form>
            <Hidden xsDown>
              <Tooltip title='Menuju toko Shopee kami'>
                <IconButton href={publicRuntimeConfig.url.shopee}>
                  <ShopeeIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title='Informasi Kerja Sama'>
                <IconButton href={publicRuntimeConfig.url.infoPartnership}>
                  <HandshakeIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title='Informasi Umum dan Lainya'>
                <IconButton href={publicRuntimeConfig.url.infoGeneral}>
                  <ContactSupportIcon/>
                </IconButton>
              </Tooltip>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function onSubmitSearch() {

}