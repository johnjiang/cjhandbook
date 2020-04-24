import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import * as serviceWorker from "./serviceWorker";

import App from "./app";

ReactGA.initialize("UA-164017649-1", {
    gaOptions: {
        siteSpeedSampleRate: 100,
    },
});
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
