import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EnquiriesComponent from './component/enquiries';
import { getEnquiries } from '../../../lib/api';
import AuthContext from '../../../contexts/AuthContext';

const Enquiries = () => {
  const { update } = useContext(AuthContext);
  const [ apiRes, setApiRes ] = useState([]);

  useEffect(() => {
    getData();
  }, [ update ]);

  const getData = async () => {
    const res = await getEnquiries();
    setApiRes(res);
  };

  const createEnquiries = () => {
    return apiRes.map((val, i) => {
      return <EnquiriesComponent key={i} {...val} />;
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
