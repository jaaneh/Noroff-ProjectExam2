import React, { useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import cookie from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../../../lib/api';

import styles from './styles';

const establishmentReducer = (state, action) => {
  switch (action.type) {
  case 'field': {
    return {
      ...state,
      [action.field]: action.value
    };
  }
  case 'disable_button': {
    return {
      ...state,
      btnDisabled: true
    };
  }
  case 'enable_button': {
    return {
      ...state,
      btnDisabled: false
    };
  }
  case 'button_success': {
    return {
      ...state,
      btnSuccess: true
    };
  }
  case 'reset_button': {
    return {
      ...state,
      btnDisabled: false,
      btnSuccess: false
    };
  }
  case 'clear_fields': {
    return {
      ...state,
      name: '',
      email: '',
      imageUrl: '',
      description: '',
      googleLat: '',
      googleLong: '',
      price: '',
      maxGuests: ''
    };
  }
  default:
    return state;
  }
};

const initialState = {
  name: '',
  email: '',
  imageUrl: '',
  description: '',
  googleLat: '',
  googleLong: '',
  price: '',
  maxGuests: '',
  selfCatering: false,
  btnDisabled: false,
  btnSuccess: false
};

const Establishments = props => {
  const { classes } = props;
  const [ state, dispatch ] = useReducer(establishmentReducer, initialState);
  const {
    name,
    email,
    imageUrl,
    description,
    googleLat,
    googleLong,
    price,
    maxGuests,
    selfCatering,
    btnDisabled,
    btnSuccess
  } = state;

  const submitButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  const formIsValid = () => {
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (
      name &&
      email.match(emailRegex) &&
      imageUrl &&
      price &&
      maxGuests &&
      googleLat &&
      googleLong &&
      description
    ) {
      return true;
    }
    return false;
  };

  const handleAddEstablishment = evt => {
    evt.preventDefault();
    const token = cookie.get('token');

    if (formIsValid()) {
      dispatch({ type: 'disable_button' });
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
            dispatch({ type: 'enable_button' });
            dispatch({ type: 'clear_fields' });
            dispatch({ type: 'button_success' });
          }, 1500);
          setTimeout(() => {
            dispatch({ type: 'reset_button' });
          }, 5000);
        })
        .catch(err => {
          setTimeout(() => {
            dispatch({ type: 'enable_button' });
            dispatch({ type: 'clear_fields' });
          }, 1000);
        });
    }
  };

  return (
    <>
      <Typography variant='h5' component='h5' className={classes.title}>
        Add Establishments
      </Typography>
      <form onSubmit={handleAddEstablishment} noValidate autoComplete='off'>
        <Grid container justify='center' alignItems='center'>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='text'
              label='Establishment Name'
              value={name}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'name',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='text'
              label='Establishment Email'
              value={email}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'email',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='url'
              label='Image URL'
              value={imageUrl}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'imageUrl',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='text'
              label='Description'
              value={description}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'description',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              label='Google Latitude'
              value={googleLat}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'googleLat',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              label='Google Longitude'
              value={googleLong}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'googleLong',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              label='Price €'
              value={price}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'price',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              label='Max Guests'
              value={maxGuests}
              onChange={e =>
                dispatch({
                  type: 'field',
                  field: 'maxGuests',
                  value: e.target.value
                })
              }
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selfCatering}
                  onChange={e =>
                    dispatch({
                      type: 'field',
                      field: 'selfCatering',
                      value: e.target.value
                    })
                  }
                  color='primary'
                />
              }
              label='Self Catering?'
            />
          </Grid>
          <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
            <Button
              className={btnSuccess ? classes.successBtn : classes.submitBtn}
              classes={{ disabled: classes.submitDisabled }}
              component={submitButton}
              variant='contained'
              disabled={btnDisabled}
            >
              {btnSuccess ? <CheckIcon /> : 'Add Establishment'}
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
