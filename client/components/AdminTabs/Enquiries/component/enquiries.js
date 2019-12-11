import React, { useState, useContext } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';
import cookie from 'js-cookie';
import { API_URL } from '../../../../lib/api';

import AuthContext from '../../../../contexts/AuthContext';

import styles from './styles';

const EnquiriesComponent = props => {
  const { forceUpdate } = useContext(AuthContext);
  const { classes } = props;
  const [ modalOpen, setModalOpen ] = useState(false);
  const clientAvatar = props.clientName ? props.clientName.charAt(0).toUpperCase() : <Person />;

  const handleDelete = async evt => {
    evt.preventDefault();
    const token = cookie.get('token');

    axios
      .delete(`${API_URL}/enquiries/delete/${props._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setModalOpen(false);
        forceUpdate();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const replyButton = React.forwardRef((props, ref) => <button {...props} ref={ref} type='submit' />);

  return (
    <>
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <CardHeader
            avatar={<Avatar className={classes.avatar}>{clientAvatar}</Avatar>}
            title={props.clientName}
            subheader={props.email}
            action={
              <IconButton size='small' onClick={() => setModalOpen(true)}>
                <Close />
              </IconButton>
            }
          />
          <CardContent className={classes.cardContent}>
            <Typography variant='body2' paragraph>
              Establishment: {props.establishment} <br />
              Check-in: {props.checkin} <br />
              Check-out: {props.checkout}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions} disableSpacing>
            <Button className={classes.button} component={replyButton} variant='contained'>
              Finalize
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Remove enquiry?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this enquiry? This will delete this from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalOpen(false)}
            className={classes.cancelButton}
            color='primary'
            variant='contained'
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} className={classes.removeButton} color='primary' variant='contained' autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EnquiriesComponent);
