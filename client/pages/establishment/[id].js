import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Router from 'next/router';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../lib/api';

import Layout from '../../components/Layout/layout';
import EstablishmentComponent from '../../components/Establishment/establishment';
import styles from '../../styles/establishment.styles';

const Establishment = props => {
  const { classes } = props;
  const est = props.json;

  const createEst = () => {
    return (
      <EstablishmentComponent
        id={est.id}
        description={est.description}
        email={est.establishmentEmail}
        name={est.establishmentName}
        googleLat={est.googleLat}
        googleLong={est.googleLong}
        imageUrl={est.imageUrl}
        maxGuests={est.maxGuests}
        price={est.price}
        selfCatering={est.selfCatering}
      />
    );
  };

  return (
    <Layout>
      <Container style={{ paddingTop: 15 }}>
        <Grid container spacing={2}>
          {createEst()}
        </Grid>
        <Grid container>
          <Link href='/establishments'>
            <span className={classes.arrowWrapper}>
              <ArrowRightAlt className={classes.arrow} />
              <span className={classes.goBack}>Go Back</span>
            </span>
          </Link>
        </Grid>
      </Container>
    </Layout>
  );
};

Establishment.getInitialProps = async ctx => {
  const res = ctx.res;
  const id = ctx.query.id;

  const redirectOnError = () => {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      });
      res.end();
    } else {
      Router.push('/');
    }
  };

  try {
    const response = await fetch(`${API_URL}/establishments/get/${id}`);
    const json = await response.json();

    if (json.one) {
      return { json: json.one };
    } else {
      return redirectOnError();
    }
  } catch (error) {
    return redirectOnError();
  }
};

export default withStyles(styles)(Establishment);
