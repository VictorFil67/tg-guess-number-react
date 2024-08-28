import axios from "axios";
import "./App.css";

import React, { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

export const App = () => {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Инициализация Telegram WebApp SDK

    tg.ready();

    // Ожидаем закрытие WebApp
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
      .post("/start_game")
      .then(() => {
        setResult("");
        setGuess("");
        setGameStarted(true);
      })
      .catch((err) => console.error(err));
  };

  const submitGuess = () => {
    axios
      .post("/guess", { guess: parseInt(guess) })
      .then((response) => {
        setResult(response.data.result);
        if (response.data.result === "Число вгадано") {
          setGameStarted(false);
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
        <button onClick={startGame}>Почати гру</button>
      ) : (
        <>
          <input type="number" value={guess} onChange={handleInputChange} />
          <button onClick={submitGuess}>Відправити</button>
        </>
      )}
      {result && <p>{result}</p>}
      <button onClick={handleClose}>Закрити гру</button>
    </div>
  );
};

export default App;
