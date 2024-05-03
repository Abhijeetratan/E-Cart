import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//mport App from './App';
import reportWebVitals from './reportWebVitals';
//import IndexComponent from './Components/IndexComponent';
import MainCompo from './Components/MainCompo';
//import Signup from './Components/SignupComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//<Header/>
//<home/>
//<IndexComponent/>
//<Signup/>
<MainCompo/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
