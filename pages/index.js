import Head from 'next/head'
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import SavanLogoIcon from "../components/icons/savan-logo-icon";

import {makeStyles} from "@material-ui/core/styles";
import getConfig from "next/dist/next-server/lib/runtime-config";
import {useRouter} from "next/router";

export default function Home() {
  return (
    <>
      <Head>
        <title>SAVAN | usaha kami untuk anak cucu</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Branding/>
      <SiteCarousel/>
    </>
  )
}

function Branding() {
  const classes = makeStyles((theme) => ({
    root: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(32),
        paddingBottom: theme.spacing(16),
      },
    },
    logo: {
      height: '4em',
      width: '100%'
    }
  }))();
  return (
    <Container className={classes.root}>
      <SavanLogoIcon className={classes.logo} fontSize='large'/>
    </Container>
  )
}

function SiteCarousel() {
  const classes = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
    }
  }))();
  const router = useRouter();
  const {publicRuntimeConfig} = getConfig();

  return (
    <Container maxWidth='md'>
      <Typography align='center' variant='h5'>usaha kami untuk anak cucu</Typography>
      <Grid container>
        {publicRuntimeConfig.sites.map((site, i) => (
          <Grid item
                xs={12} sm={6} key={i} component={Card}
                raised className={classes.root}
          >
              <CardActionArea
                onClick={() => {
                  router.push(site.path)
                }}
              >
                <CardContent>
                  <Typography variant='h4'>{site.title}</Typography>
                  <Divider />
                  <Typography variant='body1'>{site.description}</Typography>
                </CardContent>
              </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
