import React, { ReactElement } from "react";
import { Space, Switch } from "antd";
import styled from "styled-components";

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function HideUnavailableToggle({
    checked,
    onChange,
}: Props): ReactElement {
    function onSwitchChange(checked: boolean): void {
        onChange(checked);
    }

    return (
        <ToggleContainer>
            <Space>
                <Switch checked={checked} onChange={onSwitchChange} />
                <span>Hide unavailable</span>
            </Space>
        </ToggleContainer>
    );
}
