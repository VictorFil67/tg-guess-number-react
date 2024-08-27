import "./App.css";

import React, { useEffect } from "react";

const tg = window.Telegram.WebApp;

export const App = () => {
  useEffect(() => {
    // Инициализация Telegram WebApp SDK

    tg.ready();

    // Ожидаем закрытие WebApp
  }, []);

  const handleClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      <h1>Вгадай число</h1>

      <button onClick={handleClose}>Закрити гру</button>
    </div>
  );
};

export default App;
