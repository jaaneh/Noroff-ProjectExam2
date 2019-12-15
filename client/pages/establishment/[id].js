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
import Establishment from '../../components/Establishment/establishment';
import styles from '../../styles/establishment.styles';

const SpecificEstablishment = props => {
  const { classes } = props;
  const establishmentProps = props.json;

  const createEstablishment = () => {
    return <Establishment {...establishmentProps} />;
  };

  return (
    <Layout>
      <Container style={{ paddingTop: 15 }}>
        <Grid container spacing={2}>
          {createEstablishment()}
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

SpecificEstablishment.getInitialProps = async ctx => {
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

export default withStyles(styles)(SpecificEstablishment);
