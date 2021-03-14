import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/navigation/footer';
import Head from 'next/dist/next-server/lib/head';
import NavigationAppBar from '../components/navigation/app-bar';
import { useRouter } from 'next/router';
import { Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Item from '../components/products/item';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { stringify } from '../utils/search-filter';

Index.propTypes = {
  filter: PropTypes.shape({
    page: PropTypes.number,
    sortBy: PropTypes.string,
    brands: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string)
  }),
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.object
};
export default function Index({ filter, data, error }) {
  const classes = styles();
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    filter.page = newPage;
    router.push({
      query: filter
    });
  };

  let componentPagination;
  let componentProducts = data.products.map((product, i) => (
    <Grid key={i} item xs={6} sm={4} md={3}>
      <Item product={product} />
    </Grid>
  ));
  componentPagination = (
    <Container className={classes.paginationRoot}>
      <Pagination count={data.page.total} page={data.page.current} onChange={handleChangePage} />
    </Container>
  );

  const title = 'Pencarian ' + stringify(filter);

  return (
    <>
      <Head>
        <title>{title} | Savan</title>
        <link rel="icon" href="/icon.svg" />
      </Head>
      <NavigationAppBar givenFilter={filter} />
      <Container className={classes.searchResultRoot}>
        <Grid container alignItems="flex-start" alignContent="flex-start">
          {componentProducts}
        </Grid>
      </Container>
      {componentPagination}
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const filter = {
    page: query.page ? query.page : 1,
    sortBy: query.sortBy ? query.sortBy : 'popularity',
    brands: query.brands ? query.brands : [],
    categories: query.categories ? query.categories : []
  };
  let result = await getProducts(filter);
  return {
    props: {
      data: result.data,
      filter: filter
    }
  };
}

const styles = makeStyles((theme) => ({
  searchResultRoot: {
    minHeight: '100vh'
  },
  filterRoot: {
    marginTop: theme.spacing(2)
  },
  formRoot: {
    // display: 'block',
  },
  formControlBaseRoot: {
    display: 'block',
    padding: theme.spacing(2)
  },
  formControlBaseSelectRoot: {
    width: '100%'
  },
  filterButton: {
    margin: theme.spacing(1)
  },
  paginationRoot: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

async function getProducts({ brands, categories, sortBy, page }) {
  console.log(brands, categories, sortBy, page);
  return {
    data: {
      products: products.slice((page - 1) * 20, (page - 1) * 20 + 20),
      page: {
        current: parseInt(page),
        total: 19
      }
    }
  };
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
  name: `${i} ${name}`,
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
