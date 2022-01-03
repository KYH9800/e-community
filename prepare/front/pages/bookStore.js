import React from 'react';
import Head from 'next/head';

import { Emptyplace } from '../components/style/AppLayoutSt';

import AppLayout from '../components/AppLayout';

const BookStore = () => {
  return (
    <AppLayout>
      <Head>
        <title>e도서관 | 서점</title>
      </Head>
      <Emptyplace />
      <div>서점 페이지</div>
      <div>서점 페이지</div>
      <div>서점 페이지</div>
      <div>서점 페이지</div>
      <div>서점 페이지</div>
      <div>서점 페이지</div>
    </AppLayout>
  );
};

export default BookStore;