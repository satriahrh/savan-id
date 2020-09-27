import {
  AppBar,
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
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {useState} from "react";
import SavanIcon from "../../components/icons/savan-icon";
import ShopeeIcon from "../../components/icons/shopee-icon";
import HandshakeIcon from "../../components/icons/handshake-icon";
import getConfig from "next/dist/next-server/lib/runtime-config";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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

export default function NavigationAppBar() {
  const {publicRuntimeConfig} = getConfig();

  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static" color='transparent'>
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
                  <ListItemLink href={publicRuntimeConfig.url.showcase}>
                    <ListItemIcon>
                      <SavanIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Galeri Savan'/>
                  </ListItemLink>
                  <ListItemLink href={publicRuntimeConfig.url.shopee}>
                    <ListItemIcon>
                      <ShopeeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Shopee store'/>
                  </ListItemLink>
                  <Divider/>
                  <ListItemLink href={publicRuntimeConfig.url.infoPartnership}>
                    <ListItemIcon>
                      <HandshakeIcon color='action' />
                    </ListItemIcon>
                    <ListItemText primary='Kerja Sama'/>
                  </ListItemLink>
                  <ListItemLink href={publicRuntimeConfig.url.infoGeneral}>
                    <ListItemIcon><                      ContactSupportIcon /></ListItemIcon>
                    <ListItemText>Informasi Umum</ListItemText>
                  </ListItemLink>
                </List>
              </Drawer>
            </Hidden>
            <Typography className={classes.title} variant="h6" noWrap>
              Savan Baby W
            </Typography>
            <div className={classes.search}>
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
              />
            </div>
            <Hidden xsDown>
              <Tooltip title='Buka Galeri Savan'>
                <IconButton href={publicRuntimeConfig.url.showcase}>
                  <SavanIcon />
                </IconButton>
              </Tooltip>
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
