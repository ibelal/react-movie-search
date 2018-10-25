import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './animate.css';
import './materialize.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
