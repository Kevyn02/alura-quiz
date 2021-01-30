/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizPage from './index';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizPage
        // eslint-disable-next-line react/destructuring-assignment
        dbExterno={dbExterno}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(content) {
  try {
    const { id } = content.query;
    const [projectName, githubUser] = id.split('___');
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((response) => response)
      .catch((err) => {
        console.error(err);
      });
    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
