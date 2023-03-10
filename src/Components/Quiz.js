import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const [APIData, setApiData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [results, setResults] = useState(false);
  const [toggleReset, setToggleReset] = useState(false);

  useEffect(() => {
    console.log(
      `https://opentdb.com/api.php?amount=${props.numQuestions}${props.category}${props.difLev}${props.chosenType}&encode=base64`
    );
    fetch(
      `https://opentdb.com/api.php?amount=${props.numQuestions}${props.category}${props.difLev}${props.chosenType}&encode=base64`
    )
      .then((res) => res.json())
      .then((data) => setApiData(data.results))
      .then(() => {
        reset();
      });
  }, []);

  // Decode base64 API data
  function b64Decode(str) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${props.numQuestions}${props.category}${props.difLev}${props.chosenType}&encode=base64`
    )
      .then((res) => res.json())
      .then((data) => setApiData(data.results))
      .then(() => {
        setResults(false);
        const tempArray = [];
        APIData.map((item) => {
          const tempAnswers = [];
          item.incorrect_answers.map((wrongAnswer) => {
            tempAnswers.push({
              answer: b64Decode(wrongAnswer),
              selected: false,
              correct: false,
              code: wrongAnswer,
            });
          });
          const ran1 = Math.floor(Math.random() * tempAnswers.length);
          const ran2 = Math.random();
          tempAnswers.splice(ran2 < 0.5 ? ran1 : ran1 + 1, 0, {
            answer: b64Decode(item.correct_answer),
            selected: false,
            correct: true,
            code: item.correct_answer,
          });
          tempArray.push({
            ...item,
            type: b64Decode(item.type),
            difficulty: b64Decode(item.difficulty),
            category: b64Decode(item.category),
            question: b64Decode(item.question),
            correct_answer: b64Decode(item.correct_answer),
            incorrect_answers: item.incorrect_answers.map((incorrect) =>
              b64Decode(incorrect)
            ),
            answers: tempAnswers,
            selectedAnswer: false,
          });
        });
        setSortedData(tempArray);
      });
  }, [toggleReset]);

  function toggleSelect(bean, selected) {
    console.log("this is the question " + bean.question);
    console.log(
      "These are the answers " +
        bean.answers.map(
          (answer) => " " + answer.answer + " " + answer.selected
        )
    );
    console.log(selected);

    setSortedData((prevSortedData) => {
      return prevSortedData.map((item) => {
        return item.question === bean.question
          ? // ? {...item, answers: [{answer: "Whatever"}, {answer: "guy"}]}
            {
              ...item,
              answers: bean.answers.map((answer) => {
                return selected === answer.answer
                  ? { ...answer, selected: !answer.selected }
                  : { ...answer, selected: false };
              }),
              selectedAnswer: true,
            }
          : item;
      });
    });
  }
  const makeElements = sortedData.map((item) => {
    return (
      <div key={nanoid()}>
        <p className="question">{item.question}</p>
        <div className="allAnswers">
          {item.answers.map((answer) => {
            return answer.selected === true ? (
              <p
                onClick={() => toggleSelect(item, answer.answer)}
                className={
                  answer.correct ? "answer selected" : "answer selected"
                }
              >
                {answer.answer}
              </p>
            ) : (
              <p
                onClick={() => toggleSelect(item, answer.answer)}
                className={answer.correct ? "answer" : "answer"}
              >
                {answer.answer}
              </p>
            );
          })}
        </div>
        <hr></hr>
      </div>
    );
  });

  const showResults = sortedData.map((item) => {
    return (
      <div key={nanoid()}>
        <p className="question">{item.question}</p>
        <div className="allAnswers">
          {item.answers.map((answer) => {
            return answer.selected === true ? (
              <p
                className={
                  answer.correct
                    ? "correctAnswer answer result-answer-right"
                    : "result-answer selectedWrong"
                }
              >
                {answer.answer}
              </p>
            ) : (
              <p
                className={
                  answer.correct ? "correctAnswer answer" : "result-answer"
                }
              >
                {answer.answer}
              </p>
            );
          })}
        </div>
        <hr></hr>
      </div>
    );
  });

  function toggleResults() {
    setResults(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function reset() {
    setToggleReset((prev) => !prev);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  let num = 0;
  sortedData.map((item) => {
    item.answers.map((answer) => {
      if (answer.selected === true && answer.correct === true) {
        return (num += 1);
      }
    });
  });

  return !results ? (
    <div className="questions">
      <h1 style={{ textAlign: "center", marginBottom: "2em" }}>Trivia!</h1>
      {makeElements}
      {sortedData && sortedData.length > 0 && (
        <div className="flex">
          <p style={{ color: "rgba(0,0,0,0)" }} className="score">
            invisible text
          </p>
          <button className="check-btn" onClick={toggleResults}>
            Check answers
          </button>
          <button
            style={{
              fontSize: "1.25rem",
              background: "none",
              fontWeight: "600",
              border: "none",
              padding: "0.5em 1em",
              borderRadius: "12px",
              color: "rgba(0,0,0,.7)",
            }}
            onClick={() => props.setHomescreen(true)}
          >
            return home
          </button>
        </div>
      )}
      {sortedData && sortedData.length === 0 && (
        <div className="homescreen">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  ) : (
    <div className="questions">
      <h1 style={{ textAlign: "center", marginBottom: "2em" }}>Trivia!</h1>
      {showResults}
      <div className="flex">
        <p className="score">
          You scored {num}/{sortedData.length} correct answers
        </p>
        <button className="check-btn" onClick={reset}>
          Play again
        </button>
        <button
          style={{
            fontSize: "1.25rem",
            background: "none",
            fontWeight: "600",
            border: "none",
            padding: "0.5em 1em",
            borderRadius: "12px",
            color: "rgba(0,0,0,.7)",
          }}
          onClick={() => props.setHomescreen(true)}
        >
          return home
        </button>
      </div>
    </div>
  );
}
