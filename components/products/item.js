import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, CardActionArea, CardMedia, CardContent, Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  root: {
    margin: '16px'
  },
  contentName: {
    overflow: 'hidden',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical'
  },
  contentTag: {
    marginTop: '16px'
  }
}));

Item.propTypes = {
  product: PropTypes.object
};
export default function Item({ product }) {
  const classes = styles();
  return (
    <Card className={classes.root} raised>
      <Link href={`/products/${product.id}/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia component="img" image={product.photos.thumbnails[0]} title="Sleep Suit" />
          <CardContent>
            <Typography className={classes.contentName} variant="subtitle1">
              {product.name}
            </Typography>
            <Typography>
              <strong>Rp{product.price.toLocaleString()}</strong>
            </Typography>
            <div className={classes.contentTag}>
              <Chip
                label={product.brandName}
                size="small"
                style={{ backgroundColor: product.brandColor }}
              />
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
