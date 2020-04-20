import React, { ReactElement } from "react";
import { StarTwoTone } from "@ant-design/icons";
import { message } from "antd";
import { FishData } from "./fish-table";

interface Props {
    fish: FishData;
    isCaught: boolean;
    onClick?: (isChecked: boolean) => void;
}

export default function StarFish({
    fish,
    isCaught,
    onClick,
}: Props): ReactElement {
    function onStarClicked(): void {
        if (onClick) {
            onClick(!isCaught);
            if (isCaught) {
                message.success(`Unmarked ${fish.name}`);
            } else {
                message.success(`Marked ${fish.name}`);
            }
        }
    }

    return (
        <span onClick={onStarClicked}>
            {isCaught ? (
                <StarTwoTone twoToneColor="#d4b106" />
            ) : (
                <StarTwoTone twoToneColor="#bfbfbf" />
            )}
        </span>
    );
}
