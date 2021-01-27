import React from 'react';
import Head from 'next/head';

import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';

import Widget from '../src/components/Widget';

export default function Quiz() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz - </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Pergunta 1 de 5</h1>
          </Widget.Header>
          <Widget.Content>
            <h2>Lorem Ipsum</h2>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
