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

const EstablishmentComponent = props => {
  const { classes } = props;

  const establishmentButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={props.imageUrl}
          title={props.establishmentProps}
        />
        <CardContent className={classes.cardContent}>
          <Typography component='h4' variant='h4' gutterBottom>
            {props.establishmentName}
          </Typography>
          <Typography variant='body2' color='textSecondary' paragraph>
            {props.description}
          </Typography>
          <CardActions className={classes.cardActions} disableSpacing>
            <Typography variant='body2'>(€{props.price} /night)</Typography>
            <Link href='/enquiry/[id]' as={`/enquiry/${props.id}`}>
              <Button
                className={classes.button}
                component={establishmentButton}
                variant='contained'
              >
                Enquiry
              </Button>
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(EstablishmentComponent);
