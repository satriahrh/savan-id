import Footer from "../../components/navigation/footer";
import Head from "next/dist/next-server/lib/head";
import NavigationAppBar from "../../components/navigation/app-bar";
import {useRouter} from "next/router";
import {Container, Grid} from "@material-ui/core";
import Item from "../../components/products/item";
import {makeStyles} from "@material-ui/core/styles";

export default function Index() {
  const router = useRouter();
  Index.getInitialProps = ({query}) => {
    return {query}
  };

  const classes = styles();
  return (
    <>
      <Head>
        <title>Toko Bayi | Pencarian {router.query.q}</title>
        <link rel="icon" href="/icon.svg"/>
      </Head>
      <NavigationAppBar searchKeyword={router.query.q}/>
      <Grid
        className={classes.searchResultRoot}
        component={Container}
        container
        alignItems='flex-start'
        alignContent='flex-start'
      >
        {products.map((product, i) => (
          <Grid item xs={6} sm={4} md={2}>
            <Item key={i} product={product} />
          </Grid>
        ))}
      </Grid>
      <Footer/>
    </>
  )
}

const styles = makeStyles((theme) => ({
  searchResultRoot: {
    minHeight: '100vh',
  }
}));

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
    slug: `/savan/${i}-sleep-suit-abu`,
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