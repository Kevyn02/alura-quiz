/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import AlternativeForm from '../src/components/AlternativeForm';
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

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Quiz Completo!!!
        </h3>
      </Widget.Header>
      <Widget.Content>
        <p>
          Você Acertou {
            results.filter((result) => result).length
          } de {results.length} perguntas
        </p>
        <ul>
          {/* eslint-disable-next-line array-callback-return */}
          {results.map((result, index) => {
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              ´#${index + 1} Resultado: ${result ? 'Acertou' : 'Errou'}`
            </li>;
          })}
        </ul>
        <Button type="button">
          Confirmar
        </Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, handleSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const questionID = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  // eslint-disable-next-line radix
  const isCorrect = Number.parseInt(selectedAlternative) === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

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
        <AlternativeForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            handleSubmit(isCorrect);
          }, 3000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            // eslint-disable-next-line radix
            const isSelected = Number.parseInt(selectedAlternative) === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionID}
                  type="radio"
                  value={alternativeIndex}
                  disabled={isQuestionSubmited}
                  onChange={(e) => setSelectedAlternative(e.target.value)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativeForm>

      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [results, setResults] = useState([]);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentQuestion, quizFinished]);

  function handleSubmit(isCorrect) {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizFinished(true);
    }
    setResults([...results, isCorrect]);
    setLoading(true);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {/* eslint-disable-next-line no-mixed-operators */}
        {loading && <LoadingWidget />}
        {/* eslint-disable-next-line no-mixed-operators */}
        {!loading && !quizFinished && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            handleSubmit={handleSubmit}
          />
        )}
        {/* eslint-disable-next-line no-mixed-operators */}
        {!loading && quizFinished && (
          <ResultWidget
            results={results}
          />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
