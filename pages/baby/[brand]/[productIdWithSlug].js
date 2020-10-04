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
import ShopeeIcon from "../../../components/icons/shopee-icon";

import NavigationAppBar from "../../../components/navigation/app-bar";
import {default as RelatedProductsCarousel} from "../../../components/products/carousel";
import {makeStyles} from "@material-ui/core/styles";

export default function Index() {
  const router = useRouter();
  const id = getIdFromSlug(router.query.productIdWithSlug);
  Index.getInitialProps = ({query}) => {
    return {query}
  };

  const [product, setProduct] = useState({loading: true});
  let productDetail = <h1>Tunggu Ya</h1>
  if (product.loading) {
    getProduct(id).then((product) => {
      setProduct({
        loading: false,
        detail: product
      })
    });
  } else {
    productDetail = <ProductDetail productDetail={product.detail}/>
  }

  return (
    <>
      <Head>
        <title>Toko Bayi {product.loading ? '' : ' | ' + product.detail.name}</title>
        <link rel="icon" href="/icon.svg"/>
      </Head>
      <NavigationAppBar/>
      {productDetail}
      <RelatedProducts/>
    </>
  )
}

function ProductDetail({productDetail}) {
  const classes = styles();
  const theme = useTheme();
  const [selectedVariant, setSelectedVariant] = useState(Object.keys(productDetail.variants)[0]);
  const handleVariantChange = (event, newVariant) => {
    setSelectedVariant(newVariant)
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
        <ProductCarousel photos={productDetail.variants[selectedVariant].featuredPhotos}/>
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
            {productDetail ? Object.keys(productDetail.variants).map((variant) => (
              <ToggleButton size='small' value={variant}>
                {variant}
              </ToggleButton>
            )) : ''}
          </ToggleButtonGroup>
        </div>
        <div className={classes.detailSize}>
          <span className={classes.detailSizeSelected}>Ukuran</span>
          <ToggleButtonGroup exclusive value={selectedSize} onChange={handleSizeChange}>
            {productDetail ? productDetail.sizes.map((size) => (
              <ToggleButton size='small' value={size}>
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
                    console.log(selectedSize)
                    if (selectedSize) {
                      window.open(productDetail.shopeeUrlSizes[selectedSize])
                    } else {
                      openSnackbar('Pilih ukuran terlebih dahulu')
                    }
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
  >{descriptions.map((description) => (
    <Accordion square elevation={0}
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

function getIdFromSlug(slug) {
  let ret = "";
  for (let i = 0; i < slug?.length; i++) {
    if (slug[i] === '-') {
      break
    }
    ret += slug[i]
  }
  return ret
}

async function getProduct(id) {
  return {
    id: id,
    name: 'Jumper Nahkoda Abu',
    sizes: ['NB', 'S', 'M', 'L', '1', '2', '3'],
    brand: {
      name: 'Savan',
      color: '#FFD770',
    },
    price: 21300,
    thumbnailUrl: `https://via.placeholder.com/200x200/8f8e94/FFFFFF?text=Jumper Nahkoda Abu`,
    variants: {
      Putih: {
        featuredPhotos: [
          'https://via.placeholder.com/600x600/8f8e94/8f8e94?text=FotoUtamaPutih',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKedua',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKetiga',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeempat',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKelima',
        ]
      },
      Polos: {
        featuredPhotos: [
          'https://via.placeholder.com/600x600/FFFFFF/8f8e94?text=FotoUtamaPolos',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKedua',
        ]
      },
      Pilus: {
        featuredPhotos: [
          'https://via.placeholder.com/600x600/FFFFFF/8f8e94?text=FotoUtamaPolos',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKedua',
        ]
      },
      Strip: {
        featuredPhotos: [
          'https://via.placeholder.com/600x600/FFFFFF/8f8e94?text=FotoUtamaPolos',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKedua',
        ]
      },
      Strap: {
        featuredPhotos: [
          'https://via.placeholder.com/600x600/FFFFFF/8f8e94?text=FotoUtamaPolos',
          'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKedua',
        ]
      },
    },
    descriptions: [
      {
        summary: "Detail",
        details: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."
      },
      {
        summary: "Ukuran",
        details: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish."
      },
      {
        summary: "Bahan dan Perawatan",
        details: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
      },
    ],
    shopeeUrlSizes: {
      NB: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
      S: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
      M: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
      L: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
      1: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
      2: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
      3: 'https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490',
    }
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