import React, { ReactElement } from "react";
import { Card, Descriptions } from "antd";
import styled from "styled-components";

import {
    Hemisphere,
    MonthRangeDescription,
    TimeRangeDescription,
} from "./animal-table";
import AnimalStatusTag from "./animal-status-tag";
import StarAnimal from "./star-animal";
import { Animal, AnimalType, Fish } from "../../types";

const CardContainer = styled.div`
    padding-bottom: 10px;
`;

interface Props {
    animals: Animal[];
    animalType: AnimalType;
    hemisphere: Hemisphere;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
}

function isFish(animal: Animal): animal is Fish {
    return (animal as Fish).size !== undefined;
}

export default function AnimalCards({
    animals,
    animalType,
    hemisphere,
    caughtFish,
    onCaughtFishChange,
}: Props): ReactElement {
    return (
        <div>
            {animals.map(
                (animal): ReactElement => {
                    const type = animalType.toLowerCase();

                    return (
                        <CardContainer key={animal.name}>
                            <Card
                                size="small"
                                title={
                                    <span>
                                        <img
                                            src={`/images/${type}/${type}-${animal.id}.png`}
                                            alt={animal.name}
                                            loading="lazy"
                                        />
                                        {animal.name}
                                        {isFish(animal) && (
                                            <span> ({animal.size})</span>
                                        )}
                                    </span>
                                }
                                extra={
                                    <AnimalStatusTag
                                        animal={animal}
                                        hemisphere={hemisphere}
                                    />
                                }
                                style={{ width: "100%" }}
                                actions={[
                                    <StarAnimal
                                        key="star"
                                        animal={animal}
                                        isCaught={Boolean(
                                            caughtFish[animal.name],
                                        )}
                                        onClick={(isChecked): void => {
                                            onCaughtFishChange(
                                                animal.name,
                                                isChecked,
                                            );
                                        }}
                                    />,
                                ]}
                            >
                                <Descriptions size="small" bordered column={2}>
                                    <Descriptions.Item label="Location">
                                        {animal.location}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Price">
                                        {animal.price}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Time" span={2}>
                                        <TimeRangeDescription
                                            ranges={animal.time}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Month" span={2}>
                                        <MonthRangeDescription
                                            ranges={animal.month}
                                            hemisphere={hemisphere}
                                        />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </CardContainer>
                    );
                },
            )}
        </div>
    );
}
