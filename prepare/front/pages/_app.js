import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { wrapper } from '../store/configureStore';

const KStyle = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>K-Style</title>
    </Head>
    <Component />
  </>
);

KStyle.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default wrapper.withRedux(KStyle);
