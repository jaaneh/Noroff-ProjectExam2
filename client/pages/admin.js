import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Router from 'next/router';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';

import Layout from '../components/Layout/layout';
import Home from '../components/AdminTabs/Home/home';
import Enquiries from '../components/AdminTabs/Enquiries/enquiries';
import Messages from '../components/AdminTabs/Messages/messages';
import Establishments from '../components/AdminTabs/Establishments/establishments';

import { API_URL } from '../lib/api';
import styles from '../styles/admin.styles';

const TabContainer = props => {
  return <Typography component='div'>{props.children}</Typography>;
};

const Admin = props => {
  const { classes } = props;
  const [ value, setValue ] = useState(0);

  const handleChange = (evt, val) => {
    setValue(val);
  };

  return (
    <>
      <Head>
        <title>Admin - Holidaze - A hotel booking site.</title>
      </Head>
      <Layout>
        <AppBar position='static' className={classes.toolBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { backgroundColor: '#003580' } }}
            centered
          >
            <Tab className={classes.tab} label='Home' />
            <Tab className={classes.tab} label='Enquiries' />
            <Tab className={classes.tab} label='Messages' />
            <Tab className={classes.tab} label='Establishments' />
          </Tabs>
        </AppBar>
        <Container>
          {value === 0 && (
            <TabContainer>
              <Home />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <Enquiries />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <Messages />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <Establishments />
            </TabContainer>
          )}
        </Container>
      </Layout>
    </>
  );
};

Admin.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  const res = ctx.res;

  const redirectOnError = () => {
    if (res) {
      res.writeHead(302, {
        Location: '/login'
      });
      res.end();
    } else {
      Router.push('/login');
    }
  };

  try {
    const response = await fetch(`${API_URL}/user/validate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      return redirectOnError();
    }
  } catch (error) {
    return redirectOnError();
  }
};

export default withStyles(styles)(Admin);
