import React from 'react';
import { colors, Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getConfig from 'next/dist/next-server/lib/runtime-config';

const styles = makeStyles(() => ({
  root: {
    backgroundColor: colors.grey['800'],
    marginTop: '16px',
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  body: {
    color: colors.grey['50']
  }
}));
export default function Footer() {
  const { publicRuntimeConfig } = getConfig();
  const classes = styles();

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="body2" align="center" className={classes.body}>
          powered by{' '}
          <Link href={publicRuntimeConfig.url.authorSite}>
            {publicRuntimeConfig.copy.authorSite}
          </Link>
        </Typography>
      </Container>
    </div>
  );
}
