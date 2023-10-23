
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import waveImg from "./wave.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: "100px"
  }
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={waveImg}
        title="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          CardMedia test
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          The CardMedia component sets a background image to cover available
          space.
        </Typography>
      </CardContent>
    </Card>
  );
}
