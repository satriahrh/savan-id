import {Card, CardActionArea, CardMedia, CardContent, Chip, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";

const styles = makeStyles((theme) => ({
  root: {
    margin: '16px',
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
  const router = useRouter();
  return (
    <Card className={classes.root}
          raised
    >
      <CardActionArea
        onClick={() => {
          router.push(`/baby${product.slug}`)
        }}
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
      </CardActionArea>
    </Card>
  )
}
