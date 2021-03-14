import Head from 'next/head';
import Footer from '../components/navigation/footer';
import NavigationAppBar from '../components/navigation/app-bar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import getConfig from 'next/dist/next-server/lib/runtime-config';
import { Button, ButtonGroup, Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import SavanBabyIcon from '../components/icons/savan-baby-icon';
import ShopeeIcon from '../components/icons/shopee-icon';
import { Facebook, Instagram, WhatsApp } from '@material-ui/icons';
import Carousel from 'react-multi-carousel';
import { default as ProductCarousel } from '../components/products/carousel';
import Link from 'next/link';

export default function Baby() {
  return (
    <>
      <Head>
        <title>Savan Baby Store - toko kebutuhan pakaian bayi lengkap</title>
        <link rel="icon" href="/icon.svg" />
      </Head>
      <NavigationAppBar />
      <Heading />
      <Banner />
      <HighlightedProducts />
      <Footer />
    </>
  );
}

const styles = makeStyles((theme) => ({
  headingRoot: {
    [theme.breakpoints.up('sm')]: {
      minHeight: '100vh'
    }
  },
  headingHeadline: {
    [theme.breakpoints.only('xs')]: {
      marginTop: '2vh'
    }
  },
  bannerRoot: {
    [theme.breakpoints.only('xs')]: {
      marginTop: '2vh'
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  highlightedProductsRoot: {
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2vh'
    }
  },
  highlightedProductsCarousel: {
    [theme.breakpoints.only('xs')]: {
      marginRight: '-16px',
      marginLeft: '-16px'
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: '-24px',
      marginLeft: '-24px'
    }
  }
}));

function Heading() {
  const { publicRuntimeConfig } = getConfig();
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));
  return (
    <Grid
      className={classes.headingRoot}
      component={Container}
      container
      direction="row"
      alignItems="center"
      alignContent={isMobile ? 'flex-start' : 'center'}>
      <Grid
        className={classes.headingHeadline}
        item
        xs={12}
        sm={12}
        md={6}
        component={Container}
        container
        direction="column"
        alignItems={isMobile ? 'flex-start' : isTablet ? 'center' : 'flex-end'}>
        <Typography variant="h5" component="p">
          <TextStrong>Pakaian bayi</TextStrong> bagai teman kecilnya,{' '}
          <TextStrong>kualitas terbaik</TextStrong> dari sekain yang ada,{' '}
          <TextStrong>dekat</TextStrong> dan <TextStrong>mudah</TextStrong> dari manapun berada.
        </Typography>
        {isMobile ? '' : <br />}
        <br />
        <ButtonGroup>
          <Link
            href={
              publicRuntimeConfig.url.search +
              '?' +
              publicRuntimeConfig.url.savanBabyStoreSearchPromotedQuery
            }
            passHref>
            <Button variant="contained" color="primary" startIcon={<SavanBabyIcon />} component="a">
              {' '}
              Galeri
            </Button>
          </Link>
          <Button
            variant="outlined"
            startIcon={<ShopeeIcon />}
            href={publicRuntimeConfig.url.shopee}>
            {' '}
            Shopee
          </Button>
        </ButtonGroup>
        {isMobile ? '' : <br />}
        <br />
        <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
          <Button href={publicRuntimeConfig.url.facebook}>
            <Facebook />
          </Button>
          <Button href={publicRuntimeConfig.url.whatsapp}>
            <WhatsApp />
          </Button>
          <Button href={publicRuntimeConfig.url.instagram}>
            <Instagram />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} container justify="flex-start" alignContent="flex-start">
        <img src="/baby-index-ilustration.png" height="100%" width="100%" />
      </Grid>
    </Grid>
  );
}

function Banner() {
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container className={classes.bannerRoot}>
      <Carousel
        responsive={{
          all: {
            breakpoint: { min: 0, max: 6000 },
            items: 1,
            slidesToSlide: 1
          }
        }}
        ssr={true}
        infinite={true}
        swipeable={true}
        draggable={true}
        centerMode={false}
        arrows={!isMobile}>
        {retrieveImages(useMediaQuery(theme.breakpoints.only('xs')))}
      </Carousel>
    </Container>
  );
}

function HighlightedProducts() {
  const classes = styles();

  return (
    <Container className={classes.highlightedProductsRoot}>
      <Typography variant="h4" gutterBottom>
        Spesial hari ini
      </Typography>
      <div className={classes.highlightedProductsCarousel}>
        <ProductCarousel products={products} />
      </div>
    </Container>
  );
}

const products = [
  'Sleep Suit Abu',
  'Celana Panjang Rib Abu',
  'Celana Panjang Pop Abu',
  'Celana Pendek Pop Abu',
  'Celana Segitiga Pop Abu',
  'Baju Oblong Pop Abu',
  'Baju Oblong Pendek Abu',
  'Baju Oblong Bis Abu',
  'Jumper Kutung Abu',
  'Jumper Pendek Abu',
  'Jumper Nahkoda Abu'
].map((name, i) => ({
  id: i,
  slug: `sleep-suit-abu`,
  name: name,
  sizes: ['s', 'm'],
  brand: {
    code: 'savan',
    name: 'Savan',
    color: '#FFD770'
  },
  price: 21300,
  thumbnailUrl: `https://via.placeholder.com/200x200/8f8e94/FFFFFF?text=${name}`,
  variants: {
    Putih: {
      sampleColorIcoUrl: 'http://google.com/a.jpg',
      sampleUrl: 'http://google.com/a.jpg'
    },
    Polos: {
      sampleColorIcoUrl: 'http://google.com/a.jpg',
      sampleUrl: 'http://google.com/a.jpg'
    }
  },
  shopeeUrlSizes: {
    s:
      'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
    m:
      'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490'
  }
}));

function retrieveImages(isMobile) {
  return [1, 2].map((i) => (
    <img
      key={i}
      src={`https://via.placeholder.com/${
        isMobile ? '414x736' : '1200x600'
      }/8f8e94/FFFFFF?text=banner${i}${isMobile}`}
      alt="placeholder"
      width="100%"
      height="100%"
    />
  ));
}

function TextStrong({ children }) {
  const theme = useTheme();
  return (
    <strong style={{ color: theme.palette.primary.main, WebkitTextStroke: '0.35px black' }}>
      {children}
    </strong>
  );
}
