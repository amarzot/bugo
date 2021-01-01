import React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import { Paper } from '@material-ui/core';

export default function Index() {
    return (
      <Layout title="bugo" subtitle="/'bu.goʊ/">
          <Paper maxWidth='xlg' >
            <Typography style={{minHeight: '64rem'}}>
              Testing this 'paper' thing... hmmm looks ok
            </Typography>
          </Paper>
      </Layout>
    );
  }
