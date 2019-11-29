import React, { useContext, useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import cookie from 'js-cookie';
import Router from 'next/router';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';

import Layout from '../components/Layout/layout';

import AuthContext from '../contexts/AuthContext';
import styles from '../styles/login.styles';

import axios from 'axios';
import { API_URL } from '../lib/api';

const loginReducer = (state, action) => {
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
  default:
    return state;
  }
};

const initialState = {
  username: '',
  password: '',
  usernameErr: '',
  passwordErr: '',
  btnDisabled: false
};

const Login = props => {
  const { classes } = props;
  const { signIn } = useContext(AuthContext);
  const [ state, dispatch ] = useReducer(loginReducer, initialState);
  const { username, password, usernameErr, passwordErr, btnDisabled } = state;

  const submitButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  const formIsValid = () => {
    if (username.length >= 3 && username.length <= 16 && password.length >= 4) {
      return true;
    }
    return false;
  };

  const handleLogin = evt => {
    evt.preventDefault();

    if (formIsValid()) {
      dispatch({ type: 'disable_button' });
      const body = {
        username: username,
        password: password,
        last_login: new Date().getTime()
      };

      axios
        .post(`${API_URL}/user/login`, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          cookie.set('token', res.data.token);
          signIn();
        })
        .catch(err => {
          setTimeout(() => {
            dispatch({
              type: 'field',
              field: 'usernameErr',
              value: 'Invalid username!'
            });
            dispatch({
              type: 'field',
              field: 'passwordErr',
              value: 'Invalid password!'
            });
            dispatch({ type: 'enable_button' });
          }, 1000);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Holidaze - Login</title>
      </Head>
      <Layout>
        <Container>
          <Typography variant='h4' component='h4' className={classes.title}>
            Login
          </Typography>
          <form onSubmit={handleLogin} noValidate autoComplete='off'>
            <Grid container justify='center' alignItems='center'>
              <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
                <TextField
                  type='text'
                  label='Username'
                  onChange={e =>
                    dispatch({
                      type: 'field',
                      field: 'username',
                      value: e.target.value
                    })
                  }
                  variant='outlined'
                  fullWidth
                  helperText={
                    usernameErr === '' ? 'Enter your username' : usernameErr
                  }
                  error={usernameErr !== ''}
                />
              </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
              <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
                <TextField
                  type='password'
                  label='Password'
                  onChange={e =>
                    dispatch({
                      type: 'field',
                      field: 'password',
                      value: e.target.value
                    })
                  }
                  variant='outlined'
                  fullWidth
                  helperText={
                    passwordErr === '' ? 'Enter your username' : passwordErr
                  }
                  error={passwordErr !== ''}
                />
              </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
              <Grid className={classes.spacing} item xs={12} sm={6} md={4}>
                <Button
                  className={classes.submitBtn}
                  classes={{ disabled: classes.submitDisabled }}
                  component={submitButton}
                  variant='contained'
                  disabled={btnDisabled}
                >
                  Login
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

Login.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  const res = ctx.res;

  const redirectToAdmin = () => {
    if (res) {
      res.writeHead(302, {
        Location: '/admin'
      });
      res.end();
    } else {
      Router.push('/admin');
    }
  };

  try {
    const response = await fetch(`${API_URL}/user/validate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      return redirectToAdmin();
    } else {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    return error;
  }
};

export default withStyles(styles)(Login);
