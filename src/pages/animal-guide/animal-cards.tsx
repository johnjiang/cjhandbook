import React, { ReactElement } from "react";
import { Card } from "antd";
import styled from "styled-components";

import { Hemisphere } from "./animal-table";
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
                                title={
                                    <span>
                                        <img
                                            src={`/images/${type}/${type}-${animal.id}.png`}
                                            alt={animal.name}
                                            loading="lazy"
                                        />
                                        {animal.name}
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
                                <p>Location: {animal.location}</p>
                                {isFish(animal) && <p>Size: {animal.size}</p>}
                                <p>Price: {animal.price}</p>
                            </Card>
                        </CardContainer>
                    );
                },
            )}
        </div>
    );
}
