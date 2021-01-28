/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuizComplete({ acertos, totalQuestions }) {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Quiz Completo!!!
        </h3>
      </Widget.Header>
      <Widget.Content>
        <h2>
          Parabéns Por Finalizar
        </h2>
        <p>
          Você Acertou {acertos} de {totalQuestions} perguntas
        </p>
        <Button type="button">
          Confirmar
        </Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, handleSubmit, handleAnswer,
}) {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta {questionIndex + 1} de {totalQuestions}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        src={question.image}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionIndex}
                  type="radio"
                  value={index}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>

      </Widget.Content>
    </Widget>
  );
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [conclusion, setConclusion] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentQuestion, conclusion]);

  function handleAnswer(anwser) {
    // eslint-disable-next-line radix
    setUserAnswer(Number.parseInt(anwser));
  }

  function handleSubmit(e) {
    e.preventDefault();
    //
    if (userAnswer === question.answer) {
      setAcertos(acertos + 1);
    }
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setConclusion(true);
    }
    setLoading(true);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {/* eslint-disable-next-line no-mixed-operators */}
        {loading && <LoadingWidget />}
        {/* eslint-disable-next-line no-mixed-operators */}
        {!loading && !conclusion && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            handleSubmit={handleSubmit}
            handleAnswer={handleAnswer}
          />
        )}
        {/* eslint-disable-next-line no-mixed-operators */}
        {!loading && conclusion && (
          <QuizComplete
            acertos={acertos}
            totalQuestions={totalQuestions}
          />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
