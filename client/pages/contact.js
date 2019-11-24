import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout/layout';
import styles from '../styles/contact.styles';

import { API_URL } from '../lib/api';
import axios from 'axios';

const Contact = props => {
  const { classes } = props;
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ btnDisabled, setBtnDisabled ] = useState(false);

  const submitButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} type='submit' />
  ));

  const formIsValid = () => {
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (email.match(emailRegex)) {
      return true;
    }
    return false;
  };

  const handleContact = evt => {
    evt.preventDefault();

    if (formIsValid()) {
      setBtnDisabled(true);
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
            setBtnDisabled(false);
          }, 1500);
          return res;
        })
        .catch(err => {
          setBtnDisabled(false);
        });
    }
  };

  return (
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
                onChange={e => setName(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setMessage(e.target.value)}
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
                className={classes.submitBtn}
                classes={{ disabled: classes.submitDisabled }}
                component={submitButton}
                variant='contained'
                disabled={btnDisabled}
              >
                Contact
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

export default withStyles(styles)(Contact);
