import React, { ReactElement } from "react";
import { Card } from "antd";
import styled from "styled-components";

import { Hemisphere } from "./animal-table";
import AnimalStatusTag from "./animal-status-tag";
import StarAnimal from "./star-animal";
import { Animal, AnimalType } from "../../types";

const CardContainer = styled.div`
    padding-bottom: 10px;
`;

interface Props {
    animals: Animal[];
    animalType: AnimalType;
    hemisphere: Hemisphere;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
    searchFilter?: string;
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
                    return (
                        <CardContainer key={animal.name}>
                            <Card
                                title={
                                    <span>
                                        <StarAnimal
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
                                        />{" "}
                                        <img
                                            src={`/images/${animalType.toLowerCase()}-${
                                                animal.id
                                            }.png`}
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
                            >
                                <p>Location: {animal.location}</p>
                                {/*<p>Size: {animal.size}</p>*/}
                                <p>Price: {animal.price}</p>
                            </Card>
                        </CardContainer>
                    );
                },
            )}
        </div>
    );
}
