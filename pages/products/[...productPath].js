import {useRouter} from "next/router";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  RadioGroup,
  Radio,
  Snackbar,
  Typography,
  useMediaQuery, useTheme
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
import Head from "next/dist/next-server/lib/head";
import {useState} from "react";
import Carousel from "react-multi-carousel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShopeeIcon from "../../components/icons/shopee-icon";

import NavigationAppBar from "../../components/navigation/app-bar";
import {default as RelatedProductsCarousel} from "../../components/products/carousel";
import {makeStyles} from "@material-ui/core/styles";
import Footer from "../../components/navigation/footer";
import firestore from "../../firebase/firestore.init";
import Error from 'next/error'

export default function Index({data, error}) {
  if (error || !data) {
    return <Error statusCode={error?.statusCode} title={error?.title} />
  }

  return (
    <>
      <Head>
        <title>{data.product.name + ' | Produk Savan'}</title>
        <link rel="icon" href="/icon.svg"/>
      </Head>
      <NavigationAppBar/>
      <ProductDetail productDetail={data.product} />
      <RelatedProducts/>
      <Footer/>
    </>
  )
}

export async function getServerSideProps({params}) {
  try {
    const productId = getIdFromProductPath(params.productPath);
    const product = await getProduct(productId);
    return {
      props: {
        data: {
          product: product
        }
      }
    };
  } catch (err) {
    return {
      props: {
        error: {
          statusCode: 404,
          title: err.toString(),
        }
      }
    };
  }
}

function ProductDetail({productDetail}) {
  const classes = styles();
  const theme = useTheme();
  const [selectedVariant, setSelectedVariant] = useState('main');
  const handleVariantChange = (event, newVariant) => {
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const [selectedSize, setSelectedSize] = useState();
  const handleSizeChange = (event, newSize) => {
    setSelectedSize(newSize)
  };

  const [snackbarData, setSnackbarData] = useState({open: false, message: ''});
  const openSnackbar = (message) => {
    setSnackbarData({
      open: true,
      message: message,
    })
  };
  const handleSnackbarClose = (event, reason) => {
    setSnackbarData({
      open: false,
      message: '',
    })
  };

  return (
    <Grid container
          className={classes.root}
          component={useMediaQuery(theme.breakpoints.up('md')) ? Container : 'div'}
          direction='row'
    >
      <Grid item
            xs={12} md={7}
            className={classes.carouselRoot}
      >
        <ProductCarousel photos={productDetail.photos[selectedVariant]}/>
      </Grid>
      <Grid item
            xs={12} md={5}
            className={classes.detailRoot}
            component={useMediaQuery(theme.breakpoints.up('md')) ? 'div' : Container}
      >
        <h1 className={classes.detailName}>{productDetail.name}</h1>
        <Divider/>
        <Hidden smDown>
          <Price price={productDetail.price}/>
        </Hidden>
        <div className={classes.detailVariant}>
          <span className={classes.detailVariantSelected}>Varian</span>
          <ToggleButtonGroup exclusive value={selectedVariant} onChange={handleVariantChange}>
            {productDetail ? productDetail.variants.main.map((variant, i) => (
              <ToggleButton key={i} size='small' value={variant}>
                {variant}
              </ToggleButton>
            )) : ''}
          </ToggleButtonGroup>
        </div>
        <div className={classes.detailSize}>
          <span className={classes.detailSizeSelected}>Ukuran</span>
          <ToggleButtonGroup exclusive value={selectedSize} onChange={handleSizeChange}>
            {productDetail ? productDetail.variants.secondary.map((size, i) => (
              <ToggleButton key={i} size='small' value={size}>
                {size}
              </ToggleButton>
            )) : ''}
          </ToggleButtonGroup>
        </div>
        <Hidden mdUp>
          <Price price={productDetail.price}/>
        </Hidden>
        <div className={classes.detailAction}>
          <Button startIcon={<ShopeeIcon/>}
                  variant='outlined'
                  size='large'
                  onClick={() => {
                    window.open(productDetail.marketplacesUrl.shopee)
                  }}
          >Beli di Shopee</Button>
        </div>
        <Description descriptions={productDetail.descriptions}/>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarData.open}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        message={snackbarData.message}
      />
    </Grid>
  )
}

function ProductCarousel({photos}) {
  const theme = useTheme();
  return (
    <Carousel
      responsive={{
        all: {
          breakpoint: {min: 0, max: 6000},
          items: 1,
          slidesToSlide: 1
        }
      }}
      ssr={true} infinite={true} swipeable={true} draggable={true} centerMode={false} showDots={true}
      arrows={useMediaQuery(theme.breakpoints.up('md'))}
    >
      {photos.map((photoUrl) => (
        <img key={photoUrl}
             src={photoUrl}
             alt='placeholder'
             width='100%'
             height='100%'
        />
      ))}
    </Carousel>
  )
}

function Price({price}) {
  const classes = styles();
  return <span className={classes.detailPrice}>Rp{price.toLocaleString()}</span>
}

function Description({descriptions}) {
  const classes = styles();
  const [expanded, setExpanded] = useState(descriptions[0].summary);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return <div
    className={classes.detailDescriptions}
  >{descriptions.map((description, i) => (
    <Accordion key={i} square elevation={0}
               expanded={expanded === description.summary}
               onChange={handleChange(description.summary)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{description.summary}</AccordionSummary>
      <AccordionDetails>{description.details}</AccordionDetails>
    </Accordion>
  ))}</div>
}

function RelatedProducts({productId}) {
  const classes = styles();
  const [relatedProduct, setRelatedProduct] = useState({loading: true});

  if (relatedProduct.loading) {
    getRelatedProducts(productId).then((result) => {setRelatedProduct({
      loading: false,
      data: result,
    })});
    return <div />
  }

  return (
    <Container className={classes.relatedProductsRoot}>
      <Typography variant='h6' gutterBottom>Produk terkait</Typography>
      <div className={classes.relatedProductsCarousel}>
        <RelatedProductsCarousel products={relatedProduct.data}/>
      </div>
    </Container>
  )
}

const styles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
    fontFamily: 'Roboto'
  },
  carouselRoot: {
    // marginLeft: '-16px',
    // marginRight: '-32px',
  },
  detailRoot: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
    },
  },
  detailName: {
    fontWeight: 400
  },
  detailVariant: {
    paddingTop: theme.spacing(1),
  },
  detailVariantSelected: {
    display: 'block',
  },
  detailSize: {
    paddingTop: theme.spacing(1)
  },
  detailSizeSelected: {
    display: 'block'
  },
  detailPrice: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '300',
    lineHeight: '64px',
    height: '64px',
  },
  selectionRadioGroup: {
    flexDirection: 'row',
  },
  selectionRadioLabel: {
    borderColor: 'rgba(0,0,0,0.23)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
  },
  selectionRadioRadio: {
    visibility: 'hidden',
    width: 0,
  },
  detailAction: {
    paddingTop: theme.spacing(1)
  },
  detailDescriptions: {
    paddingTop: theme.spacing(1),
  },
  relatedProductsRoot: {
    marginTop: theme.spacing(3),
  },
  relatedProductsCarousel: {
    [theme.breakpoints.only('xs')]: {
      marginRight: '-16px',
      marginLeft: '-16px',
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: '-24px',
      marginLeft: '-24px',
    }
  }
}));

function getIdFromProductPath(productPath) {
  if (productPath?.length === undefined || productPath.length < 2) {
    return undefined;
  } else {
    return productPath[0] + '-' + productPath[1];
  }
}

async function getProduct(id) {
  try {
    const doc = await firestore.collection('products').doc(id).get();
    if (doc.exists) {
      return doc.data();
    } else {
      throw 'produk tidak ditemukan';
    }
  } catch (err) {
    if (err.name == 'FirebaseError') {
      throw 'tidak bisa mengambil data';
    }
    throw err;
  }
}

async function getRelatedProducts(id) {
  return [
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
    'Jumper Nahkoda Abu',
  ].map((name, i) => (
    {
      id: i,
      slug: `sleep-suit-abu`,
      name: name,
      sizes: ['s', 'm'],
      brand: {
        name: 'Savan',
        color: '#FFD770',
      },
      price: 21300,
      thumbnailUrl: `https://via.placeholder.com/200x200/8f8e94/FFFFFF?text=${name}`,
      variants: {
        Putih: {
          sampleColorIcoUrl: 'http://google.com/a.jpg',
          sampleUrl: 'http://google.com/a.jpg',
        },
        Polos: {
          sampleColorIcoUrl: 'http://google.com/a.jpg',
          sampleUrl: 'http://google.com/a.jpg',
        },
      },
      shopeeUrlSizes: {
        s: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
        m: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490'
      }
    }
  ))
}