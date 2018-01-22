import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'));
registerServiceWorker();
