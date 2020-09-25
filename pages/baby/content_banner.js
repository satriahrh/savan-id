import {Container, useMediaQuery, useTheme} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  banner: {
    [theme.breakpoints.only('xs')]: {
      marginTop: '2vh',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
}));


export default function Banner() {
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      className={classes.banner}
    >
      <Carousel
        responsive={{
          all: {
            breakpoint: {min: 0, max: 6000},
            items: 1,
            slidesToSlide: 1
          }
        }}
        ssr={true} infinite={true} swipeable={true} draggable={true} centerMode={false}
        arrows={!isMobile}
      >
        {retrieveImages(useMediaQuery(theme.breakpoints.only('xs')))}
      </Carousel>
    </Container>
  )
}

function retrieveImages(isMobile) {
  return [1, 2].map((i) => (
    <img
      key={i}
      src={`https://via.placeholder.com/${isMobile ? '414x736' : '1200x600'}/8f8e94/FFFFFF?text=banner${i}${isMobile}`}
      alt='placeholder'
      width='100%' height='100%'
    />
  ))
}