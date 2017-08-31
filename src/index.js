import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameBoard from './GameBoard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GameBoard />, document.getElementById('root'));
registerServiceWorker();