import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../lib/api';

import Layout from '../components/Layout/layout';
import Establishments from '../components/Establishments/establishments';

const AllEstablishments = props => {
  const establishmentsProps = props.json;

  const createEstablishments = () => {
    return establishmentsProps.map((val, i) => {
      return <Establishments key={i} {...val} />;
    });
  };

  return (
    <>
      <Head>
        <title>Holidaze - Establishments</title>
      </Head>
      <Layout>
        <Container style={{ paddingTop: 15 }}>
          <Grid container spacing={2}>
            {createEstablishments()}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

AllEstablishments.getInitialProps = async () => {
  const res = await fetch(`${API_URL}/establishments/getAll`);
  const json = await res.json();

  return {
    json: json.all
  };
};

export default AllEstablishments;
