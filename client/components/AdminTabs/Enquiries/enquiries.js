import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EnquiriesComponent from './Model/enquiries';
import { getEnquiries } from '../../../lib/api';

const Enquiries = () => {
  const [ apiRes, setApiRes ] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getEnquiries();
    setApiRes(res);
  };

  const createEnquiries = () => {
    return apiRes.map((val, i) => {
      return (
        <EnquiriesComponent
          key={i}
          clientName={val.clientName}
          email={val.email}
          establishment={val.establishment}
          checkin={val.checkin}
          checkout={val.checkout}
        />
      );
    });
  };

  return (
    <Container>
      <Typography
        variant='h5'
        component='h5'
        style={{
          fontWeight: 'normal',
          padding: '0.8em 0'
        }}
      >
        Enquiries
      </Typography>
      <Grid container spacing={2}>
        {createEnquiries()}
      </Grid>
    </Container>
  );
};

export default Enquiries;
