import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Link from 'next/link';

import styles from './styles';

const EstablishmentsComponent = props => {
  const { classes } = props;

  const estButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={props.imageUrl}
          title={props.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography component='h5' variant='h5' gutterBottom>
            {props.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' paragraph>
            {props.description}
          </Typography>
          <CardActions className={classes.cardActions} disableSpacing>
            <Typography variant='body2'>(€{props.price} /night)</Typography>
            <Link href='/establishment/[id]' as={`/establishment/${props.id}`}>
              <Button
                className={classes.button}
                component={estButton}
                variant='contained'
              >
                View More
              </Button>
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(EstablishmentsComponent);
