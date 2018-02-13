import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import constants from './constants';

ReactDOM.render(<App input={constants.INPUT_STRING}/>, document.getElementById('root'));
registerServiceWorker();
