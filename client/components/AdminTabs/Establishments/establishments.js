import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import cookie from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../../../lib/api';

import styles from './styles';

const Establishments = props => {
  const { classes } = props;
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ googleLat, setGoogleLat ] = useState('');
  const [ googleLong, setGoogleLong ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ maxGuests, setMaxGuests ] = useState('');
  const [ selfCatering, setSelfCatering ] = useState(Boolean);
  const [ btnDisabled, setBtnDisabled ] = useState(false);

  const submitButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  const formIsValid = () => {
    if (
      name &&
      email &&
      imageUrl &&
      description &&
      googleLat &&
      googleLong &&
      price &&
      maxGuests
    ) {
      return true;
    }
    return false;
  };

  const handleAddEst = evt => {
    evt.preventDefault();
    const token = cookie.get('token');

    if (formIsValid()) {
      setBtnDisabled(true);
      const body = {
        name: name,
        email: email,
        imageUrl: imageUrl,
        price: price,
        maxGuests: maxGuests,
        googleLat: googleLat,
        googleLong: googleLong,
        description: description,
        selfCatering: selfCatering
      };

      axios
        .post(`${API_URL}/establishments/add`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          setTimeout(() => {
            setBtnDisabled(false);
          }, 1500);
          return res;
        })
        .catch(err => {
          setTimeout(() => {
            setBtnDisabled(false);
          }, 1500);
        });
    }
  };

  return (
    <>
      <Typography variant='h5' component='h5' className={classes.title}>
        Add Establishments
      </Typography>
      <form onSubmit={handleAddEst} noValidate autoComplete='off'>
        <Grid container justify='center' alignItems='center'>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='text'
              id='name'
              label='Establishment Name'
              onChange={e => setName(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='text'
              id='email'
              label='Establishment Email'
              onChange={e => setEmail(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='url'
              id='image'
              label='Image URL'
              onChange={e => setImageUrl(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='text'
              id='description'
              label='Description'
              onChange={e => setDescription(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              id='googlelat'
              label='Google Latitude'
              onChange={e => setGoogleLat(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              id='googlelong'
              label='Google Longitude'
              onChange={e => setGoogleLong(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              id='price'
              label='Price €'
              onChange={e => setPrice(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              id='guests'
              label='Max Guests'
              onChange={e => setMaxGuests(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selfCatering}
                  onChange={e => setSelfCatering(!selfCatering)}
                  color='primary'
                />
              }
              label='Self Catering?'
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <Button
              className={classes.submitBtn}
              classes={{ disabled: classes.submitDisabled }}
              component={submitButton}
              variant='contained'
              disabled={btnDisabled}
            >
              Add Establishment
              {btnDisabled && (
                <CircularProgress size={38} className={classes.loadingSymbol} />
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default withStyles(styles)(Establishments);
