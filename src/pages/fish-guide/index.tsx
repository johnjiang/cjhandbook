import React, { ReactElement, useState } from "react";
import { Progress, Select, Space } from "antd";
import styled from "styled-components";
import "antd/es/date-picker/style/css";
import FishTable, { Hemisphere } from "./fish-table";
import useLocalStorage from "../../helpers/use-local-storage";
import HideUnavailableToggle from "./hide-unavailable-toggle";
import CaughtFishToggle from "./caught-fish-toggle";
import SearchInput from "./search-input";

const { Option } = Select;

const ContentContainer = styled.div`
    background: #fff;
    padding: 24px;
    min-height: 800px;
`;

const ProgressContainer = styled.div`
    width: 200px;
`;

const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    justify-content: space-between;
    align-items: center;
`;

export default function FishGuide(): ReactElement {
    const [hemisphere, setHemisphere] = useState(Hemisphere.NORTHEN);
    const [isRealTime, setRealTime] = useState(false);
    const [showCaughtFish, setShowCaughtFish] = useState(true);
    const [caughtFish, setCaughtFish] = useLocalStorage("caughtFish", {});
    const [searchFilter, setSearchFilter] = useState("");

    function onCaughtFishChange(fishName: string, isCaught: boolean): void {
        const newCaughtFish = {
            ...caughtFish,
            [fishName]: isCaught,
        };
        setCaughtFish(newCaughtFish);
    }

    const totalCaught = Object.values(caughtFish).filter(Boolean).length;

    return (
        <ContentContainer>
            <ToolbarContainer>
                <Space>
                    <SearchInput onChange={setSearchFilter} />
                    <Select
                        defaultValue={Hemisphere.NORTHEN}
                        style={{ width: 120 }}
                        onChange={(data): void => setHemisphere(data)}
                    >
                        <Option value={Hemisphere.NORTHEN}>Northern</Option>
                        <Option value={Hemisphere.SOUTHERN}>Southern</Option>
                    </Select>

                    <HideUnavailableToggle
                        onChange={(val): void => setRealTime(val)}
                    />

                    <CaughtFishToggle
                        checked={showCaughtFish}
                        onChange={(val): void => setShowCaughtFish(val)}
                    />
                </Space>

                <ProgressContainer>
                    <Progress
                        percent={Math.ceil((totalCaught / 80) * 100)}
                        status="active"
                    />
                </ProgressContainer>
            </ToolbarContainer>

            <FishTable
                hemisphere={hemisphere}
                isRealTime={isRealTime}
                caughtFish={caughtFish}
                showCaughtFish={showCaughtFish}
                onCaughtFishChange={onCaughtFishChange}
                searchFilter={searchFilter}
            />
        </ContentContainer>
    );
}
