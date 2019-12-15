import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Head from 'next/head';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../lib/api';

import Layout from '../components/Layout/layout';
import Establishments from '../components/Establishments/establishments';

import styles from '../styles/home.styles';

const Home = props => {
  const { classes } = props;
  const all = props.json;
  const allFiltered = props.json.filter((el, i) => {
    return i % 3 === 0;
  });

  const getEstablishmentId = establishmentName => {
    let id;
    JSON.stringify(all, (key, val) => {
      if (val['establishmentName'] === establishmentName) {
        id = val.id;
      }
      return val;
    });
    return id;
  };

  const goToEstablishment = async (e, val) => {
    if (val === null || val === undefined || val === '') {
      return;
    }
    const id = await getEstablishmentId(val);
    Router.push(`/establishment/${id}`);
  };

  const createEstablishment = () => {
    return allFiltered.map((val, i) => {
      return <Establishments key={i} {...val} />;
    });
  };

  return (
    <>
      <Head>
        <title>Holidaze - Home</title>
      </Head>
      <Layout>
        <img
          src={require('../public/images/hero-gradient.jpg')}
          className={classes.hero}
          alt='Image of Sunset Beach'
        />
        <Container>
          <div className={classes.heroWrapper}>
            <Typography variant='body2' className={classes.discover}>
              DISCOVER...
            </Typography>
            <Typography variant='h1' className={classes.title}>
              SUNSET BEACH
            </Typography>
            <Autocomplete
              options={all.map(option => option.establishmentName)}
              className={classes.autocomplete}
              onChange={goToEstablishment}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder='Search Establishments...'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  className={classes.textField}
                  InputProps={{
                    ...params.InputProps,
                    classes: {
                      focused: classes.noBorder,
                      notchedOutline: classes.noBorder
                    },
                    startAdornment: (
                      <InputAdornment
                        position='start'
                        className={classes.positionStart}
                      >
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </div>
        </Container>
        <Container style={{ paddingTop: 25 }}>
          <Typography variant='h5' className={classes.handpicked}>
            HANDPICKED ESTABLISHMENTS
          </Typography>
          <Grid container spacing={2}>
            {createEstablishment()}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

Home.getInitialProps = async ctx => {
  const res = await fetch(`${API_URL}/establishments/getAll`);
  const json = await res.json();

  return {
    json: json.all
  };
};

export default withStyles(styles)(Home);
