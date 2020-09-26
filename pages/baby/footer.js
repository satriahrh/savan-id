import {colors, Container, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.grey["800"],
    marginTop: '16px',
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  body: {
    color: colors.grey["50"]
  }

}));
export default function Footer() {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant='body2' align='center' className={classes.body}>
          powered by <Link href='https://satriahrh.github.io'>satriahrh.github.com</Link>
        </Typography>
      </Container>
    </div>

  )
}