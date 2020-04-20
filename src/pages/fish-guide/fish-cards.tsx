import React, { ReactElement } from "react";
import { Card } from "antd";
import styled from "styled-components";

import { FishData, Hemisphere } from "./fish-table";
import FishStatusTag from "./fish-status-tag";
import StarFish from "./star-fish";

const CardContainer = styled.div`
    padding-bottom: 10px;
`;

interface Props {
    fishies: FishData[];
    hemisphere: Hemisphere;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
    searchFilter?: string;
}

export default function FishCards({
    fishies,
    hemisphere,
    caughtFish,
    onCaughtFishChange,
}: Props): ReactElement {
    return (
        <div>
            {fishies.map(
                (fish): ReactElement => {
                    return (
                        <CardContainer key={fish.name}>
                            <Card
                                title={
                                    <span>
                                        <StarFish
                                            fish={fish}
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
