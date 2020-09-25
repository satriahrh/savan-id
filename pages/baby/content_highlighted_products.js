import {Container, Typography} from "@material-ui/core";
import {default as ProductCarousel} from "../../components/products/carousel";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2vh',
    },
  },
  productCarousel: {
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

export default function HighlightedProducts() {
  const classes = styles();

  return (
    <Container className={classes.root}>
      <Typography variant='h4' gutterBottom>Spesial hari ini</Typography>
      <div className={classes.productCarousel}>
        <ProductCarousel products={products}/>
      </div>
    </Container>
  )
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
));