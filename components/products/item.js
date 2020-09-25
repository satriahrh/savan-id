import {Card, CardMedia, CardContent, Chip, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    margin: '0.6rem',
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

export default function Item({product}) {
  const classes = styles();
  return (
    <Card className={classes.root}
          raised
    >
      <CardMedia
        component='img'
        image={product.thumbnailUrl}
        title='Sleep Suit'
      />
      <CardContent>
        <Typography className={classes.contentName} variant='subtitle1'>
          {product.name}
        </Typography>
        <Typography><strong>Rp{product.price.toLocaleString()}</strong></Typography>
        <div className={classes.contentTag}>
          <Chip label={product.brand.name} size='small'
                style={{backgroundColor: product.brand.color}}
          />
        </div>

      </CardContent>
    </Card>
  )
}
