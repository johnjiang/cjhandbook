import React, { ReactElement } from "react";
import { Card } from "antd";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";

import fishData from "../../../data/json/fish.json";
import { FishData, Hemisphere, isFishAvailable } from "./fish-table";
import FishStatusTag from "./fish-status-tag";
import StarFish from "./star-fish";

const CardContainer = styled.div`
    padding-bottom: 10px;
`;

interface Props {
    hemisphere: Hemisphere;
    isRealTime: boolean;
    showCaughtFish?: boolean;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
    searchFilter?: string;
}

export default function FishCards({
    isRealTime,
    showCaughtFish = true,
    hemisphere,
    caughtFish,
    onCaughtFishChange,
    searchFilter,
}: Props): ReactElement {
    let dataSource: FishData[] = Object.values(fishData);

    if (isRealTime) {
        dataSource = dataSource.filter((data) => {
            return isFishAvailable(data, hemisphere);
        });
    }

    if (!showCaughtFish) {
        dataSource = dataSource.filter((data) => {
            return !caughtFish[data.name];
        });
    }

    if (searchFilter && !isEmpty(searchFilter)) {
        dataSource = dataSource.filter((data) => {
            return data.name.toLowerCase().includes(searchFilter.toLowerCase());
        });
    }

    return (
        <div>
            {dataSource.map(
                (fish): ReactElement => {
                    return (
                        <CardContainer key={fish.name}>
                            <Card
                                title={
                                    <span>
                                        <StarFish
                                            isCaught={Boolean(
                                                caughtFish[fish.name],
                                            )}
                                            onClick={(isChecked): void => {
                                                onCaughtFishChange(
                                                    fish.name,
                                                    isChecked,
                                                );
                                            }}
                                        />{" "}
                                        {fish.name}
                                    </span>
                                }
                                extra={
                                    <FishStatusTag
                                        fish={fish}
                                        hemisphere={hemisphere}
                                    />
                                }
                                style={{ width: 300 }}
                            >
                                <p>Location: {fish.location}</p>
                                <p>Size: {fish.size}</p>
                                <p>Price: {fish.price}</p>
                            </Card>
                        </CardContainer>
                    );
                },
            )}
        </div>
    );
}
