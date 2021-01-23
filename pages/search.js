import Footer from "../components/navigation/footer";
import Head from "next/dist/next-server/lib/head";
import NavigationAppBar from "../components/navigation/app-bar";
import {useRouter} from "next/router";
import {
  Button,
  Container,
  Hidden,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  Input,
  Typography,
} from "@material-ui/core";
import {
  Pagination
} from "@material-ui/lab";
import Item from "../components/products/item";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import TuneIcon from '@material-ui/icons/Tune';
import getConfig from "next/dist/next-server/lib/runtime-config";
import {stringify} from "../utils/search-filter";

export default function Index() {
  const classes = styles();
  const router = useRouter();
  Index.getInitialProps = ({query}) => {
    return {query}
  };
  const {publicRuntimeConfig} = getConfig();
  const [filter, setFilter] = useState({page: 1, brands: [], categories: [], sortBy: 'popularity', state: 0,});
  const handleChangePage = (event, newPage) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: newPage,
      state: 1,
    }))
  };

  const [getProductsResult, setGetProductsResult] = useState();

  let componentPagination;
  let componentProducts;
  if (getProductsResult) {
    componentProducts = getProductsResult.products.map((product, i) => (
      <Grid key={i} item xs={6} sm={4} md={3}>
        <Item product={product}/>
      </Grid>
    ));
    componentPagination = (
      <Container className={classes.paginationRoot}>
        <Pagination count={getProductsResult.page.total}
                    page={getProductsResult.page.current}
                    onChange={handleChangePage}
        />
      </Container>
    )
  }

  useEffect(() => {
    if (filter.state === 2) {
      getProducts(filter).then((result) => {
        setGetProductsResult(result.data)
      })
    }
  }, [filter]);

  useEffect(() => {
    if (!(Object.keys(router.query).length === 0 && router.query.constructor === Object)) {
      const buildFilter = {
        page: router.query.page || 1,
        brands: router.query.brands ? Array(0).concat(router.query.brands) : [],
        categories: router.query.categories ? Array(0).concat(router.query.categories) : [],
        sortBy: router.query.sortBy ? router.query.sortBy : 'popularity',
        state: 2
      };
      setFilter(buildFilter);
    }
  }, [router.query]);

  const title = 'Pencarian ' + stringify(filter)

  return (
    <>
      <Head>
        <title>{title} | Savan</title>
        <link rel="icon" href="/icon.svg"/>
      </Head>
      <NavigationAppBar givenFilter={filter}/>
      <Container className={classes.searchResultRoot}><Grid
        container
        alignItems='flex-start'
        alignContent='flex-start'
      >
        {componentProducts}
      </Grid></Container>
      {componentPagination}
      <Footer/>
    </>
  )
}

const styles = makeStyles((theme) => ({
  searchResultRoot: {
    minHeight: '100vh',
  },
  filterRoot: {
    marginTop: theme.spacing(2)
  },
  formRoot: {
    // display: 'block',
  },
  formControlBaseRoot: {
    display: 'block',
    padding: theme.spacing(2),

  },
  formControlBaseSelectRoot: {
    width: '100%',
  },
  filterButton: {
    margin: theme.spacing(1)
  },
  paginationRoot: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  }
}));

async function getProducts({brands, categories, sortBy, page}) {
  return {
    data: {
      products: products.slice((page-1)*20, ((page-1)*20)+20),
      page: {
        current: parseInt(page),
        total: 19,
      },
    },
  }
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
  'Jumper Nahkoda Abu','Sleep Suit Abu',
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
    name: `${i} ${name}`,
    sizes: ['s', 'm'],
    brand: {
      code: 'savan',
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