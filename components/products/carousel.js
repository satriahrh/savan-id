import {default as Base} from "react-multi-carousel";
import {useMediaQuery, useTheme} from "@material-ui/core";
import Item from "./item";

export default function Carousel({products}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = {
    mobile: {
      breakpoint: {min: theme.breakpoints.values.xs, max: theme.breakpoints.values.sm},
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: {min: theme.breakpoints.values.sm, max: theme.breakpoints.values.md},
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    },
    desktop: {
      breakpoint: {min: theme.breakpoints.values.md, max: 6000},
      items: 5,
      slidesToSlide: 2 // optional, default to 1.
    },
  };

  return (
    <Base
      centerMode={isMobile} ssr={true} infinite={true} swipeable={true} draggable={true}
      responsive={responsive} transitionDuration={100}
      arrows={!isMobile}
    >
      {products.map((product, i) => (
        <Item key={product.id} product={product}
        />
      ))}
    </Base>
  )
}