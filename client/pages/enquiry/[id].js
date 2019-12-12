import React, { useState, useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import CheckIcon from '@material-ui/icons/Check';

import Layout from '../../components/Layout/layout';
import styles from '../../styles/enquiry.styles';

import Link from 'next/link';

import { API_URL } from '../../lib/api';
import axios from 'axios';

const enquiryReducer = (state, action) => {
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
      clientName: '',
      email: ''
    };
  }
  default:
    return state;
  }
};

const initialState = {
  clientName: '',
  email: '',
  checkin: new Date(),
  checkout: new Date(),
  btnDisabled: false,
  btnSuccess: false
};

const Enquiry = props => {
  const { classes } = props;
  const establishmentProps = props.json;
  const establishmentID = establishmentProps ? establishmentProps.id : '';
  const [ name, setName ] = useState(
    establishmentProps ? establishmentProps.establishmentName : ''
  );
  const [ state, dispatch ] = useReducer(enquiryReducer, initialState);
  const {
    clientName,
    email,
    checkin,
    checkout,
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

    if (name && clientName && email.match(emailRegex) && checkin && checkout) {
      return true;
    }
    return false;
  };

  const handleContact = evt => {
    evt.preventDefault();

    if (formIsValid()) {
      dispatch({ type: 'disable_button' });
      const body = {
        name: name,
        clientName: clientName,
        email: email,
        checkin: checkin.toISOString().slice(0, 10),
        checkout: checkout.toISOString().slice(0, 10)
      };

      axios
        .post(`${API_URL}/enquiries/add`, body, {
          headers: {
            'Content-Type': 'application/json'
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
    <Layout>
      <Container>
        <Link href={'/establishment/' + establishmentID}>
          <span className={classes.arrowWrapper}>
            <ArrowRightAlt className={classes.arrow} />
            <span className={classes.goBack}>Go Back</span>
          </span>
        </Link>
        <Typography variant='h5' component='h5' className={classes.title}>
          Enquiry
        </Typography>
        <form onSubmit={handleContact} noValidate autoComplete='off'>
          <Grid container justify='center' alignItems='center'>
            <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
              <TextField
                type='text'
                label='Establishment'
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
          </Grid>

          <Grid container justify='center' alignItems='center'>
            <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
              <TextField
                type='text'
                label='Your Name'
                value={clientName}
                onChange={e =>
                  dispatch({
                    type: 'field',
                    field: 'clientName',
                    value: e.target.value
                  })
                }
                variant='outlined'
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justify='center' alignItems='center'>
            <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
              <TextField
                type='email'
                label='Your Email'
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
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={12} sm={6} md={4}>
                <KeyboardDatePicker
                  autoOk
                  inputVariant='outlined'
                  format='MM/dd/yyyy'
                  margin='normal'
                  label='Check-in date'
                  fullWidth
                  value={checkin}
                  onChange={date =>
                    dispatch({
                      type: 'field',
                      field: 'checkin',
                      value: date
                    })
                  }
                  InputAdornmentProps={{ position: 'start' }}
                />
              </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
              <Grid item xs={12} sm={6} md={4}>
                <KeyboardDatePicker
                  autoOk
                  inputVariant='outlined'
                  format='MM/dd/yyyy'
                  margin='normal'
                  label='Check-out date'
                  fullWidth
                  value={checkout}
                  onChange={date =>
                    dispatch({
                      type: 'field',
                      field: 'checkout',
                      value: date
                    })
                  }
                  // onChange={date => setCheckout(date)}
                  InputAdornmentProps={{ position: 'start' }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          <Grid container justify='center' alignItems='center'>
            <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
              <Button
                className={btnSuccess ? classes.successBtn : classes.submitBtn}
                classes={{ disabled: classes.submitDisabled }}
                component={submitButton}
                variant='contained'
                disabled={btnDisabled}
              >
                {btnSuccess ? <CheckIcon /> : 'Contact'}
                {btnDisabled && (
                  <CircularProgress
                    size={38}
                    className={classes.loadingSymbol}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

Enquiry.getInitialProps = async ({ query }) => {
  const res = await fetch(`${API_URL}/establishments/get/${query.id}`);
  const json = await res.json();

  return {
    json: json.one
  };
};

export default withStyles(styles)(Enquiry);
