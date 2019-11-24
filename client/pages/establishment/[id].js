import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../lib/api';

import Layout from '../../components/Layout/layout';
import EstablishmentComponent from '../../components/Establishment/establishment';

const Establishment = props => {
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
      </Container>
    </Layout>
  );
};

Establishment.getInitialProps = async ({ query }) => {
  const res = await fetch(`${API_URL}/establishments/get/${query.id}`);
  const json = await res.json();

  return {
    json: json.one
  };
};

export default Establishment;
