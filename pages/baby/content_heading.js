import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Button, ButtonGroup, Container, Grid, Typography, useMediaQuery} from "@material-ui/core";
import {Facebook, Instagram, Store, WhatsApp} from "@material-ui/icons";

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
        <Typography variant='h5'>pakaian terbaik khusus bayi terbaik</Typography>
        {isMobile ? '' : <br/>}
        <br/>
        <Typography variant='body2'>kunjungi kami di</Typography>
        <div>
          <Button variant='contained' color="primary"><Store/> Galeri</Button>
          <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
            <Button>Shopee</Button>
            <Button>Tokopedia</Button>
            <Button>Bukalapak</Button>
          </ButtonGroup>
        </div>
        {isMobile ? '' : <br/>}
        <br/>
        <Typography variant='body2'>temukan kami di</Typography>
        <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
          <Button><Facebook/></Button>
          <Button><WhatsApp/></Button>
          <Button><Instagram/></Button>
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
