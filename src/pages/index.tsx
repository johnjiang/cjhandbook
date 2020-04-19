import React, { ReactElement, useState } from "react";
import { Layout, Select, Space } from "antd";
import styled from "styled-components";

import SEO from "../components/seo";
import HeaderMenu from "./menu";
import FishGuide, { Hemisphere } from "./fish-guide";
import RealTimeToggle from "./fish-guide/real-time-toggle";
import useLocalStorage from "../helpers/use-local-storage";
import CaughtFishToggle from "./fish-guide/caught-fish-toggle";

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
    const [showCaughtFish, setShowCaughtFish] = useState(true);
    const [caughtFish, setCaughtFish] = useLocalStorage("caughtFish", {});

    function onCaughtFishChange(fishName: string, isCaught: boolean): void {
        const newCaughtFish = {
            ...caughtFish,
            [fishName]: isCaught,
        };
        setCaughtFish(newCaughtFish);
    }

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

                        <RealTimeToggle
                            onChange={(val): void => setRealTime(val)}
                        />

                        <CaughtFishToggle
                            checked={showCaughtFish}
                            onChange={(val): void => setShowCaughtFish(val)}
                        />
                    </Space>
                </ToolbarContainer>

                <FishGuide
                    hemisphere={hemisphere}
                    isRealTime={isRealTime}
                    caughtFish={caughtFish}
                    showCaughtFish={showCaughtFish}
                    onCaughtFishChange={onCaughtFishChange}
                />
            </ContentContainer>
        </Layout>
    );
}
