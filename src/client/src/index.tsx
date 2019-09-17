import React, { FunctionComponent, useEffect } from "react";
import ReactDOM from 'react-dom';

import { verifySessionKey, destroySessionKey, getSessionKey } from "./libs/session";
import * as serviceWorker from './serviceWorker';
import { PageNavbar } from "./components/PageNavbar";
import { Routes } from "./Routes";
import { Footer } from "./components/Footer";

import "holderjs";
import "bootstrap/dist/css/bootstrap.css";

export const Root: FunctionComponent = () => {
  useEffect(() => {
    verifySessionKey()
    .then((res) => res.json())
    .then((obj) => {
      if(!obj.isSessionValid && getSessionKey()) {
        destroySessionKey();
      }
    }); 
  }, []);

  return (
    <>
      <PageNavbar />
      <div style={{minHeight: "150vh"}}>
        <Routes />
      </div>
      <Footer />
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if(process.env.NODE_ENV === "production") {
  serviceWorker.register();
}
else {
  serviceWorker.unregister();
}
