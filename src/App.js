import axios from "axios";
import "./App.css";

import React, { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

export const App = () => {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    console.log(gameStarted);
  }, [gameStarted]);

  useEffect(() => {
    tg.ready();

    tg.onEvent("web_app_close", () => {
      console.log("WebApp closed");
    });

    return () => {
      tg.offEvent("web_app_close");
    };
  }, []);

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const startGame = () => {
    axios
      .post("https://tg-guess-number-node.onrender.com/start_game")
      .then(() => {
        setResult("");
        setGuess("");
        setGameStarted(true);
        setAttempts(0);
      })
      .catch((err) => console.error(err));
  };

  const submitGuess = () => {
    axios
      .post("https://tg-guess-number-node.onrender.com/guess", {
        guess: parseInt(guess),
      })
      .then((response) => {
        setResult(response.data.result);

        if (response.data.result === "Число вгадано!") {
          setGameStarted(false);
          setAttempts(response.data.attempts);
        }
      })
      .catch((err) => console.error(err));
  };
  const handleClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      <h1>Вгадай число</h1>
      {!gameStarted ? (
        <button onClick={startGame} className="start">
          Почати гру
        </button>
      ) : (
        <>
          <input
            type="number"
            value={guess}
            onChange={handleInputChange}
            className="number"
            placeholder="Ваше число"
          />
          <button onClick={submitGuess} className="send">
            Відправити
          </button>
        </>
      )}
      {result && (
        <p
          className={
            result === "Число вгадано!"
              ? "equal"
              : result === "Загадане число менше"
              ? "low"
              : "big"
          }
        >
          {result}
        </p>
      )}
      {attempts > 0 && <p>Ви зробили спроб: {attempts}</p>}
      <button onClick={handleClose} className="close">
        Закрити гру
      </button>
    </div>
  );
};

export default App;
