import React, { useState } from 'react';
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

import Layout from '../../components/Layout/layout';
import styles from '../../styles/enquiry.styles';

import Link from 'next/link';

import { API_URL } from '../../lib/api';
import axios from 'axios';

const Enquiry = props => {
  const { classes } = props;
  const est = props.json;
  const [ name, setName ] = useState(est ? est.establishmentName : '');
  const [ clientName, setClientName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ checkin, setCheckin ] = useState(new Date());
  const [ checkout, setCheckout ] = useState(new Date());
  const [ btnDisabled, setBtnDisabled ] = useState(false);

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
      setBtnDisabled(true);
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
    <Layout>
      <Container>
        <Link href='/establishments'>
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
                onChange={e => setName(e.target.value)}
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
                onChange={e => setClientName(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
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
                  onChange={date => setCheckin(date)}
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
                  onChange={date => setCheckout(date)}
                  InputAdornmentProps={{ position: 'start' }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

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

Enquiry.getInitialProps = async ({ query }) => {
  const res = await fetch(`${API_URL}/establishments/get/${query.id}`);
  const json = await res.json();

  return {
    json: json.one
  };
};

export default withStyles(styles)(Enquiry);
