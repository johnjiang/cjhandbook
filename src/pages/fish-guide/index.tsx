import React, { ReactElement } from "react";
import { Progress, Select, Space } from "antd";
import styled from "styled-components";
import Media from "react-media";
import "antd/es/date-picker/style/css";

import FishTable, { Hemisphere } from "./fish-table";
import useLocalStorage from "../../helpers/use-local-storage";
import HideUnavailableToggle from "./hide-unavailable-toggle";
import CaughtFishToggle from "./caught-fish-toggle";
import SearchInput from "./search-input";
import FishCards from "./fish-cards";

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
    const [hemisphere, setHemisphere] = useLocalStorage(
        "hemisphere",
        Hemisphere.NORTHEN,
    );
    const [hideUnavailable, setHideUnavailable] = useLocalStorage(
        "hideUnavailable",
        false,
    );
    const [showCaughtFish, setShowCaughtFish] = useLocalStorage(
        "showCaughtFish",
        true,
    );
    const [searchFilter, setSearchFilter] = useLocalStorage("fishSearch", "");

    const [caughtFish, setCaughtFish] = useLocalStorage("caughtFish", {});

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
                    <SearchInput
                        query={searchFilter}
                        onChange={setSearchFilter}
                    />
                    <Select
                        defaultValue={hemisphere}
                        style={{ width: 120 }}
                        onChange={(data): void => setHemisphere(data)}
                    >
                        <Option value={Hemisphere.NORTHEN}>Northern</Option>
                        <Option value={Hemisphere.SOUTHERN}>Southern</Option>
                    </Select>

                    <HideUnavailableToggle
                        checked={hideUnavailable}
                        onChange={(val): void => setHideUnavailable(val)}
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
            <Media query="(max-width: 599px)">
                {(matches): ReactElement => {
                    if (matches) {
                        return (
                            <FishCards
                                hemisphere={hemisphere}
                                isRealTime={hideUnavailable}
                                caughtFish={caughtFish}
                                showCaughtFish={showCaughtFish}
                                onCaughtFishChange={onCaughtFishChange}
                                searchFilter={searchFilter}
                            />
                        );
                    }

                    return (
                        <FishTable
                            hemisphere={hemisphere}
                            isRealTime={hideUnavailable}
                            caughtFish={caughtFish}
                            showCaughtFish={showCaughtFish}
                            onCaughtFishChange={onCaughtFishChange}
                            searchFilter={searchFilter}
                        />
                    );
                }}
            </Media>
        </ContentContainer>
    );
}
