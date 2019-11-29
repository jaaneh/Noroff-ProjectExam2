import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MessagesComponent from './Model/messages';
import { getMessages } from '../../../lib/api';
import AuthContext from '../../../contexts/AuthContext';

const Messages = () => {
  const { update } = useContext(AuthContext);
  const [ apiRes, setApiRes ] = useState([]);

  useEffect(() => {
    getData();
  }, [ update ]);

  const getData = async () => {
    const res = await getMessages();
    setApiRes(res);
  };

  const createMessages = () => {
    return apiRes.map((val, i) => {
      return (
        <MessagesComponent
          key={i}
          clientName={val.clientName}
          email={val.email}
          message={val.message}
          _id={val._id}
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
        Messages
      </Typography>
      <Grid container spacing={2}>
        {createMessages()}
      </Grid>
    </Container>
  );
};

export default Messages;
