import React, { ReactElement, useState } from "react";
import { Layout, Select, Space, Switch } from "antd";
import styled from "styled-components";

import SEO from "../components/seo";
import HeaderMenu from "./menu";
import FishGuide, { Hemisphere } from "./fish-guide";
import RealTimeToggle from "./fish-guide/real-time-toggle";

const { Header } = Layout;
const { Option } = Select;

const ContentContainer = styled.div`
    background: #fff;
    padding: 24px;
    min-height: 800px;
`;

const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
`;

export default function IndexPage(): ReactElement {
    const [hemisphere, setHemisphere] = useState(Hemisphere.NORTHEN);
    const [isRealTime, setRealTime] = useState(false);

    return (
        <Layout>
            <SEO title="Home" />
            <Header>
                <HeaderMenu />
            </Header>
            <ContentContainer>
                <ToolbarContainer>
                    <Space>
                        <Select
                            defaultValue={Hemisphere.NORTHEN}
                            style={{ width: 120 }}
                            onChange={(data): void => setHemisphere(data)}
                        >
                            <Option value={Hemisphere.NORTHEN}>Northern</Option>
                            <Option value={Hemisphere.SOUTHERN}>
                                Southern
                            </Option>
                        </Select>

                        <RealTimeToggle onChange={(val) => setRealTime(val)} />
                    </Space>
                </ToolbarContainer>

                <FishGuide hemisphere={hemisphere} isRealTime={isRealTime} />
            </ContentContainer>
        </Layout>
    );
}
