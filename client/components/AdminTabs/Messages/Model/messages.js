import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

import styles from './styles';

const MessagesComponent = props => {
  const { classes } = props;
  const clientAvatar = props.clientName ? (
    props.clientName.charAt(0).toUpperCase()
  ) : (
    <Person />
  );

  const replyButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{clientAvatar}</Avatar>}
          title={props.clientName}
          subheader={props.email}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='body2' paragraph>
            {props.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions} disableSpacing>
          <Button
            className={classes.button}
            component={replyButton}
            variant='contained'
          >
            Reply
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(MessagesComponent);
