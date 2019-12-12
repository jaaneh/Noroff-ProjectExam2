import React, { useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import Layout from '../components/Layout/layout';
import styles from '../styles/contact.styles';

import { API_URL } from '../lib/api';
import axios from 'axios';
import Head from 'next/head';

const contactReducer = (state, action) => {
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
      message: ''
    };
  }
  default:
    return state;
  }
};

const initialState = {
  name: '',
  email: '',
  message: '',
  btnDisabled: false,
  btnSuccess: false
};

const Contact = props => {
  const { classes } = props;
  const [ state, dispatch ] = useReducer(contactReducer, initialState);
  const { name, email, message, btnDisabled, btnSuccess } = state;

  const submitButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  const formIsValid = () => {
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (name && message && email.match(emailRegex)) {
      return true;
    }
    return false;
  };

  const handleContact = evt => {
    evt.preventDefault();

    if (formIsValid()) {
      dispatch({ type: 'disable_button' });
      const body = {
        clientName: name,
        email: email,
        message: message
      };

      axios
        .post(`${API_URL}/contact/add`, body, {
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
    <>
      <Head>
        <title>Holidaze - Contact</title>
      </Head>
      <Layout>
        <Container>
          <Typography variant='h5' component='h5' className={classes.title}>
            Contact Us
          </Typography>
          <form onSubmit={handleContact} noValidate autoComplete='off'>
            <Grid container justify='center' alignItems='center'>
              <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
                <TextField
                  type='text'
                  label='Your Name'
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

            <Grid container justify='center' alignItems='center'>
              <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
                <TextField
                  type='text'
                  label='Your Message'
                  value={message}
                  onChange={e =>
                    dispatch({
                      type: 'field',
                      field: 'message',
                      value: e.target.value
                    })
                  }
                  variant='outlined'
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
              <Grid className={classes.formSpacing} item xs={12} sm={6} md={4}>
                <Button
                  className={
                    btnSuccess ? classes.successBtn : classes.submitBtn
                  }
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
    </>
  );
};

export default withStyles(styles)(Contact);
