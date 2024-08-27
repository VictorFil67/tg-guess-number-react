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

  const handleClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      <h1>Вгадай число</h1>
      {!gameStarted ? (
        <button>Почати гру</button>
      ) : (
        <>
          <input type="number" value={guess} onChange={handleInputChange} />
          <button>Відправити</button>
        </>
      )}
      {result && <p>{result}</p>}
      <button onClick={handleClose}>Закрити гру</button>
    </div>
  );
};

export default App;
