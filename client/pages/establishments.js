import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../lib/api';

import Layout from '../components/Layout/layout';
import EstablishmentsComponent from '../components/Establishments/establishments';

const Establishments = props => {
  const all = props.json;

  const createEst = () => {
    return all.map((val, i) => {
      return (
        <EstablishmentsComponent
          key={i}
          id={val.id}
          description={val.description}
          email={val.establishmentEmail}
          name={val.establishmentName}
          googleLat={val.googleLat}
          googleLong={val.googleLong}
          imageUrl={val.imageUrl}
          maxGuests={val.maxGuests}
          price={val.price}
          selfCatering={val.selfCatering}
        />
      );
    });
  };

  return (
    <>
      <Head>
        <title>Establishments - Holidaze - A hotel booking site.</title>
      </Head>
      <Layout>
        <Container style={{ paddingTop: 15 }}>
          <Grid container spacing={2}>
            {createEst()}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

Establishments.getInitialProps = async ctx => {
  const res = await fetch(`${API_URL}/establishments/getAll`);
  const json = await res.json();

  return {
    json: json.all
  };
};

export default Establishments;
