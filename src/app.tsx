import React, { ReactElement } from "react";
import { Layout } from "antd";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import Media from "react-media";
import "antd/dist/antd.css";

ReactGA.initialize("UA-164017649-1", {
    gaOptions: {
        siteSpeedSampleRate: 100,
    },
});

import FishGuide from "./pages/fish-guide";

const { Content } = Layout;

export default function App(): ReactElement {
    return (
        <Router>
            <Layout>
                <Media query="(max-width: 599px)">
                    {(matches): ReactElement => {
                        const style: Record<string, string> = {
                            background: "#fff",
                        };

                        if (!matches) {
                            style.margin = "10px 10px 0px 10px";
                            style.padding = "10px";
                        }

                        return (
                            <Content style={style}>
                                <Switch>
                                    <Route exact path="/">
                                        <FishGuide />
                                    </Route>
                                </Switch>
                            </Content>
                        );
                    }}
                </Media>
            </Layout>
        </Router>
    );
}
