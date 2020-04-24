import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import App from "./app";

ReactGA.initialize("UA-164017649-1", {
    gaOptions: {
        siteSpeedSampleRate: 100,
    },
});
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById("app"));
