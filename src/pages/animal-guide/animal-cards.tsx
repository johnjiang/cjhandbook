import React, { ReactElement } from "react";
import { Card } from "antd";
import styled from "styled-components";

import { Hemisphere } from "./animal-table";
import AnimalStatusTag from "./animal-status-tag";
import StarAnimal from "./star-animal";
import { Animal } from "../../types";

const CardContainer = styled.div`
    padding-bottom: 10px;
`;

interface Props {
    animals: Animal[];
    hemisphere: Hemisphere;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
    searchFilter?: string;
}

export default function AnimalCards({
    animals,
    hemisphere,
    caughtFish,
    onCaughtFishChange,
}: Props): ReactElement {
    return (
        <div>
            {animals.map(
                (fish): ReactElement => {
                    return (
                        <CardContainer key={fish.name}>
                            <Card
                                title={
                                    <span>
                                        <StarAnimal
                                            animal={fish}
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
                                    <AnimalStatusTag
                                        animal={fish}
                                        hemisphere={hemisphere}
                                    />
                                }
                                style={{ width: 300 }}
                            >
                                <p>Location: {fish.location}</p>
                                {/*<p>Size: {fish.size}</p>*/}
                                <p>Price: {fish.price}</p>
                            </Card>
                        </CardContainer>
                    );
                },
            )}
        </div>
    );
}
