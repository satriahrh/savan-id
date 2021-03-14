import Link from 'next/link';
import { Button, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SavanLogoIcon from '../components/icons/savan-logo-icon';
import Head from 'next/head';

export default function Index() {
  const classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    },
    logo: {
      width: '8em',
      height: '100%',
      marginBottom: theme.spacing(4)
    }
  }))();
  return (
    <>
      <Head>
        <title>Savan Baby Wear - brand pakaian bayi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <SavanLogoIcon className={classes.logo} />
        <Typography variant="h3" as="h1">
          Savan Baby Wear
        </Typography>
        <Typography variant="h5" as="p" gutterBottom>
          ... akan segera hadir.
        </Typography>
        <Divider />
        <Typography>Jelajahi bisnis kami yang lain di</Typography>
        <Button variant="outlined" href="/" as={Link}>
          beranda
        </Button>
      </div>
    </>
  );
}
