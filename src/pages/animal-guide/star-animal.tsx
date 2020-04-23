import React, { ReactElement } from "react";
import { StarTwoTone } from "@ant-design/icons";
import { message } from "antd";
import { Animal } from "../../types";

interface Props {
    animal: Animal;
    isCaught: boolean;
    onClick?: (isChecked: boolean) => void;
}

export default function StarAnimal({
    animal,
    isCaught,
    onClick,
}: Props): ReactElement {
    function onStarClicked(): void {
        if (onClick) {
            onClick(!isCaught);
            if (isCaught) {
                message.success(`Unmarked ${animal.name}`);
            } else {
                message.success(`Marked ${animal.name}`);
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
