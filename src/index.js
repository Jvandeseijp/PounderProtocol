import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Dashboard from './Dashboard';
import { MoralisProvider } from 'react-moralis';


const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <React.StrictMode>
    <MoralisProvider serverUrl="https://wktq1kdcj6ca.usemoralis.com:2053/server" appId="VxE5zqqPPwUBiOJ4vcYsgA529AVRSg6pJUDI08Jb">

      <BrowserRouter history={history}>
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/calculator" exact element={<Dashboard />} />
          <Route path="/earn" exact element={<Dashboard />} />
          <Route path="/swap" exact element={<Dashboard />} />
          <Route path="/docs" exact element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </MoralisProvider>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
