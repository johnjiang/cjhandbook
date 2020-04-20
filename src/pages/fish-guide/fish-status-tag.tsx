import React, { ReactElement } from "react";
import { FishData, Hemisphere, isFishAvailable } from "./fish-table";
import { Tag } from "antd";

interface Props {
    fish: FishData;
    hemisphere: Hemisphere;
}

export default function FishStatusTag({
    fish,
    hemisphere,
}: Props): ReactElement {
    if (isFishAvailable(fish, hemisphere)) {
        return <Tag color="green">AVAILABLE</Tag>;
    }
    return <Tag color="red">UNAVAILABLE</Tag>;
}
