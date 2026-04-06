import React from 'react';
import ReactDOM from 'react-dom/client'; // 1. Обратите внимание на '/client' в конце
import App from './App';

// 2. Находим корневой элемент
const rootElement = document.getElementById('root');

// 3. Создаем корень и рендерим приложение
const root = ReactDOM.createRoot(rootElement);
root.render(
    <App/>
);