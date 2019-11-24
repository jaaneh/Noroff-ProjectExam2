import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import cookie from 'js-cookie';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';

import Layout from '../components/Layout/layout';

import AuthContext from '../contexts/AuthContext';
import styles from '../styles/login.styles';

import axios from 'axios';
import { API_URL } from '../lib/api';

const Login = props => {
  const { classes } = props;
  const { signIn } = useContext(AuthContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ btnDisabled, setBtnDisabled ] = useState(false);

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
      setBtnDisabled(true);
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
          setTimeout(() => {
            setBtnDisabled(false);
          }, 1500);
          cookie.set('token', res.data.token);
          signIn();
          return res;
        })
        .catch(err => {
          setTimeout(() => {
            setBtnDisabled(false);
            setUsernameErr('Invalid username!');
            setPasswordErr('Invalid password!');
          }, 1500);
        });
    }
  };

  return (
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
                id='username'
                label='Username'
                onChange={e => setUsername(e.target.value)}
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
                id='password'
                label='Password'
                onChange={e => setPassword(e.target.value)}
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
