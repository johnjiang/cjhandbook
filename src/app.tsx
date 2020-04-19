import React, { ReactElement } from "react";
import { Layout } from "antd";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import "antd/dist/antd.css";

ReactGA.initialize("UA-164017649-1");

import FishGuide from "./pages/fish-guide";

const { Content } = Layout;

export default function App(): ReactElement {
    return (
        <Router>
            <Layout>
                <Content
                    style={{
                        margin: "10px 10px 0px 10px",
                        padding: "10px",
                        background: "#fff",
                    }}
                >
                    <Switch>
                        <Route exact path="/">
                            <FishGuide />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    );
}
