import React, { ReactElement } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Media from "react-media";
import "antd/dist/antd.css";

import FishGuide from "./pages/animal-guide";
import ArtGuide from "./pages/art-guide";
import HeaderMenu from "./pages/menu";
import styled from "styled-components";
import AboutPage from "./pages/about";
import FooterContent from "./pages/footer-content";
import { MEDIA_QUERY } from "./helpers/media";

const { Content, Footer, Header } = Layout;

const ContentContainer = styled.div`
    background: #fff;
    padding: 20px;

    @media (max-width: 599px) {
        padding: 10px;
    }
`;

export default function App(): ReactElement {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Header>
                    <HeaderMenu />
                </Header>
                <Layout>
                    <Media query={MEDIA_QUERY}>
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
                                    <ContentContainer>
                                        <Switch>
                                            <Route exact path="/">
                                                <FishGuide />
                                            </Route>
                                            <Route exact path="/art">
                                                <ArtGuide />
                                            </Route>
                                            <Route exact path="/about">
                                                <AboutPage />
                                            </Route>
                                        </Switch>
                                    </ContentContainer>
                                </Content>
                            );
                        }}
                    </Media>
                </Layout>
                <Footer
                    style={{
                        textAlign: "center",
                        height: "40px",
                        padding: "10px",
                    }}
                >
                    <FooterContent />
                </Footer>
            </Layout>
        </Router>
    );
}
