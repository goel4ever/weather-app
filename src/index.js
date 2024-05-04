import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga4';

const gaOptions = {
  trackingId: 'G-HMTTSH9HT0',
  gaOptions: {
    siteSpeedSampleRate: 100,
  },
  gaTagOptions: {
    send_page_view: true,
  },
};

ReactGA.initialize([gaOptions]);
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
