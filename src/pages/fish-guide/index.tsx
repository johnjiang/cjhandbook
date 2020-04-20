import React, { ReactElement } from "react";
import { Select } from "antd";
import styled from "styled-components";
import Media from "react-media";
import "antd/es/date-picker/style/css";

import fishData from "../../../data/json/fish.json";
import FishTable, { Hemisphere, isFishAvailable } from "./fish-table";
import useLocalStorage from "../../helpers/use-local-storage";
import HideUnavailableToggle from "./hide-unavailable-toggle";
import CaughtFishToggle from "./caught-fish-toggle";
import SearchInput from "./search-input";
import FishCards from "./fish-cards";
import isEmpty from "lodash/isEmpty";

const { Option } = Select;

const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    align-items: center;

    @media (max-width: 599px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        height: 150px;
    }
`;

const SearchContainer = styled.div`
    width: 200px;
    padding-right: 10px;
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
    const [hideCaughtFish, setShowCaughtFish] = useLocalStorage(
        "hideCaughtFish",
        false,
    );
    const [searchFilter, setSearchFilter] = useLocalStorage("fishSearch", "");

    const defaultCaughtFish: Record<string, boolean> = {};

    const [caughtFish, setCaughtFish] = useLocalStorage(
        "caughtFish",
        defaultCaughtFish,
    );

    function onCaughtFishChange(fishName: string, isCaught: boolean): void {
        const newCaughtFish = {
            ...caughtFish,
            [fishName]: isCaught,
        };
        setCaughtFish(newCaughtFish);
    }

    let fishies = Object.values(fishData);

    if (hideUnavailable) {
        fishies = fishies.filter((data) => {
            return isFishAvailable(data, hemisphere);
        });
    }

    if (hideCaughtFish) {
        fishies = fishies.filter((data) => {
            return !caughtFish[data.name];
        });
    }

    if (searchFilter && !isEmpty(searchFilter)) {
        fishies = fishies.filter((data) => {
            return data.name.toLowerCase().includes(searchFilter.toLowerCase());
        });
    }

    return (
        <>
            <ToolbarContainer>
                <SearchContainer>
                    <SearchInput
                        query={searchFilter}
                        onChange={setSearchFilter}
                    />
                </SearchContainer>
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
                    checked={hideCaughtFish}
                    onChange={(val): void => setShowCaughtFish(val)}
                />
            </ToolbarContainer>
            <Media query="(max-width: 599px)">
                {(matches): ReactElement => {
                    if (matches) {
                        return (
                            <FishCards
                                fishies={fishies}
                                hemisphere={hemisphere}
                                caughtFish={caughtFish}
                                onCaughtFishChange={onCaughtFishChange}
                            />
                        );
                    }

                    return (
                        <FishTable
                            fishies={fishies}
                            hemisphere={hemisphere}
                            caughtFish={caughtFish}
                            onCaughtFishChange={onCaughtFishChange}
                        />
                    );
                }}
            </Media>
        </>
    );
}
