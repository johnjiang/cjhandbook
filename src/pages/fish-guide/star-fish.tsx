import React, { ReactElement } from "react";
import { StarTwoTone } from "@ant-design/icons";

interface Props {
    isCaught: boolean;
    onClick?: (isChecked: boolean) => void;
}

export default function StarFish({ isCaught, onClick }: Props): ReactElement {
    function onStarClicked(): void {
        if (onClick) {
            onClick(!isCaught);
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
