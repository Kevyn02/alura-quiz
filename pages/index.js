import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Form from '../src/components/Form';
import QuizLogo from '../src/components/QuizLogo';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  function validation(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <Form onSubmit={validation}>
              <legend>{db.description}</legend>
              <Input type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} value={name} />
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              <Button type="submit" disabled={name.length === 0}>Jogar {name}</Button>
            </Form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React fez:</p>
            <ul>
              <li>lorem ipsum dolor sit amet...</li>
              <li>lorem ipsum dolor sit amet...</li>
              <li>lorem ipsum dolor sit amet...</li>
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Kevyn02/alura-quiz" />
    </QuizBackground>
  );
}
