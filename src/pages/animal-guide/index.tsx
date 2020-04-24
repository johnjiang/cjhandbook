import React, { ReactElement } from "react";
import { Select, Space, Tabs } from "antd";
import styled from "styled-components";
import Media from "react-media";
import isEmpty from "lodash/isEmpty";
import "antd/es/date-picker/style/css";

import fishData from "../../../data/json/fish.json";
import insectData from "../../../data/json/insects.json";
import AnimalTable, { Hemisphere, isAnimalAvailable } from "./animal-table";
import useLocalStorage from "../../helpers/use-local-storage";
import HideUnavailableToggle from "./hide-unavailable-toggle";
import CaughtFishToggle from "./caught-fish-toggle";
import SearchInput from "./search-input";
import AnimalCards from "./animal-cards";
import { MEDIA_QUERY } from "../../helpers/media";
import { Animal, AnimalType, Bug, Fish } from "../../types";

const { Option } = Select;
const { TabPane } = Tabs;

const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    align-items: center;
`;

const SearchContainer = styled.div`
    width: 200px;
    padding-right: 10px;
`;

function filterAnimals(
    animals: Animal[],
    caughtAnimals: Record<string, boolean>,
    hemisphere: Hemisphere,
    hideUnavailable: boolean,
    hideCaught: boolean,
    searchFilter: string,
): Animal[] {
    let filteredAnimals = animals;
    if (hideUnavailable) {
        filteredAnimals = filteredAnimals.filter((data) => {
            return isAnimalAvailable(data, hemisphere);
        });
    }

    if (hideCaught) {
        filteredAnimals = filteredAnimals.filter((data) => {
            return !caughtAnimals[data.name];
        });
    }

    if (searchFilter && !isEmpty(searchFilter)) {
        filteredAnimals = filteredAnimals.filter((data) => {
            return data.name.toLowerCase().includes(searchFilter.toLowerCase());
        });
    }

    return filteredAnimals;
}

export default function FishGuide(): ReactElement {
    const [hemisphere, setHemisphere] = useLocalStorage(
        "hemisphere",
        Hemisphere.NORTHEN,
    );
    const [hideUnavailable, setHideUnavailable] = useLocalStorage(
        "hideUnavailable",
        false,
    );
    const [hideCaughtAnimals, setHideCaughtAnimals] = useLocalStorage(
        "hideCaughtFish",
        false,
    );
    const [searchFilter, setSearchFilter] = useLocalStorage("fishSearch", "");

    const defaultCaughtFish: Record<string, boolean> = {};

    const [caughtAnimals, setCaughtAnimals] = useLocalStorage(
        "caughtFish",
        defaultCaughtFish,
    );

    function onCaughtFishChange(fishName: string, isCaught: boolean): void {
        const newCaughtFish = {
            ...caughtAnimals,
            [fishName]: isCaught,
        };
        setCaughtAnimals(newCaughtFish);
    }

    const fishies = filterAnimals(
        fishData,
        caughtAnimals,
        hemisphere,
        hideUnavailable,
        hideCaughtAnimals,
        searchFilter,
    ) as Fish[];
    const insects = filterAnimals(
        insectData,
        caughtAnimals,
        hemisphere,
        hideUnavailable,
        hideCaughtAnimals,
        searchFilter,
    ) as Bug[];

    return (
        <>
            <ToolbarContainer>
                <Media query={MEDIA_QUERY}>
                    {(matches): ReactElement => {
                        return (
                            <Space
                                direction={matches ? "vertical" : "horizontal"}
                            >
                                <SearchContainer>
                                    <SearchInput
                                        query={searchFilter}
                                        onChange={setSearchFilter}
                                    />
                                </SearchContainer>
                                <Select
                                    defaultValue={hemisphere}
                                    style={{ width: 120 }}
                                    onChange={(data): void =>
                                        setHemisphere(data)
                                    }
                                >
                                    <Option value={Hemisphere.NORTHEN}>
                                        Northern
                                    </Option>
                                    <Option value={Hemisphere.SOUTHERN}>
                                        Southern
                                    </Option>
                                </Select>

                                <HideUnavailableToggle
                                    checked={hideUnavailable}
                                    onChange={(val): void =>
                                        setHideUnavailable(val)
                                    }
                                />

                                <CaughtFishToggle
                                    checked={hideCaughtAnimals}
                                    onChange={(val): void =>
                                        setHideCaughtAnimals(val)
                                    }
                                />
                            </Space>
                        );
                    }}
                </Media>
            </ToolbarContainer>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Fish" key="1">
                    <Media query={MEDIA_QUERY}>
                        {(matches): ReactElement => {
                            if (matches) {
                                return (
                                    <AnimalCards
                                        animals={fishies}
                                        animalType={AnimalType.FISH}
                                        hemisphere={hemisphere}
                                        caughtFish={caughtAnimals}
                                        onCaughtFishChange={onCaughtFishChange}
                                    />
                                );
                            }

                            return (
                                <AnimalTable
                                    animalType={AnimalType.FISH}
                                    animals={fishies}
                                    hemisphere={hemisphere}
                                    caughtFish={caughtAnimals}
                                    onCaughtFishChange={onCaughtFishChange}
                                />
                            );
                        }}
                    </Media>
                </TabPane>
                <TabPane tab="Bugs" key="2">
                    <Media query={MEDIA_QUERY}>
                        {(matches): ReactElement => {
                            if (matches) {
                                return (
                                    <AnimalCards
                                        animals={insects}
                                        animalType={AnimalType.BUG}
                                        hemisphere={hemisphere}
                                        caughtFish={caughtAnimals}
                                        onCaughtFishChange={onCaughtFishChange}
                                    />
                                );
                            }

                            return (
                                <AnimalTable
                                    animalType={AnimalType.BUG}
                                    animals={insects}
                                    hemisphere={hemisphere}
                                    caughtFish={caughtAnimals}
                                    onCaughtFishChange={onCaughtFishChange}
                                />
                            );
                        }}
                    </Media>
                </TabPane>
            </Tabs>
        </>
    );
}
