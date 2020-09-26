import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Button, ButtonGroup, Container, Grid, Typography, useMediaQuery} from "@material-ui/core";
import {Facebook, Instagram, Store, WhatsApp} from "@material-ui/icons";
import SavanIcon from "../../components/icons/savan-icon";
import ShopeeIcon from "../../components/icons/shopee-icon";
import getConfig from 'next/config'

const styles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minHeight: '100vh',
    },
  },
  headline: {
    [theme.breakpoints.only('xs')]: {
      marginTop: '2vh'
    },
  }
}));

export default function Heading() {
  const {publicRuntimeConfig} = getConfig();
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));
  return (
    <Grid
      className={classes.root}
      component={Container}
      container
      direction="row"
      alignItems="center"
      alignContent={isMobile ? 'flex-start' : 'center'}
    >
      <Grid
        className={classes.headline}
        item xs={12} sm={12} md={6}
        component={Container}
        container
        direction="column"
        alignItems={isMobile ? 'flex-start' : isTablet ? 'center' : 'flex-end'}
      >
        <Typography variant='h5' component='p'>
          <TextStrong>Pakaian bayi</TextStrong> bagai teman kecilnya,
          {' '}
          <TextStrong>kualitas terbaik</TextStrong> dari sekain yang ada,
          {' '}
          <TextStrong>dekat</TextStrong> dan <TextStrong>mudah</TextStrong> dari manapun berada.
        </Typography>
        {isMobile ? '' : <br/>}
        <br/>
        <ButtonGroup>
          <Button variant='contained' color="primary" startIcon={<SavanIcon />} url={publicRuntimeConfig.url.showcase}> Galeri</Button>
          <Button variant='outlined' startIcon={<ShopeeIcon />} href={publicRuntimeConfig.url.shopee}> Shopee</Button>
        </ButtonGroup>
        {isMobile ? '' : <br/>}
        <br/>
        <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
          <Button href={publicRuntimeConfig.url.facebook}><Facebook/></Button>
          <Button href={publicRuntimeConfig.url.whatsapp}><WhatsApp/></Button>
          <Button href={publicRuntimeConfig.url.instagram}><Instagram/></Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6}
            container
            justify='flex-start'
            alignContent='flex-start'
      >
        <img src='/baby-index-ilustration.png' height='100%' width='100%'/>
      </Grid>

    </Grid>
  )
}

function TextStrong({children}) {
  const theme = useTheme();
  return <strong style={{color: theme.palette.primary.main, WebkitTextStroke: '0.35px black'}}>{children}</strong>
}