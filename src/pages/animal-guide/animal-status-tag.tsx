import React, { ReactElement } from "react";
import { Tag } from "antd";

import { Hemisphere, isAnimalAvailable } from "./animal-table";
import { Animal } from "../../types";

interface Props {
    animal: Animal;
    hemisphere: Hemisphere;
}

export default function AnimalStatusTag({
    animal,
    hemisphere,
}: Props): ReactElement {
    if (isAnimalAvailable(animal, hemisphere)) {
        return <Tag color="green">AVAILABLE</Tag>;
    }
    return <Tag color="red">UNAVAILABLE</Tag>;
}
