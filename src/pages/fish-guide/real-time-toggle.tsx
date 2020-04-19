import React, { ReactElement } from "react";
import { Space, Switch, Tooltip } from "antd";
import styled from "styled-components";

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    onChange: (checked: boolean) => void;
}

export default function RealTimeToggle({ onChange }: Props): ReactElement {
    function onSwitchChange(checked: boolean): void {
        onChange(checked);
    }

    return (
        <ToggleContainer>
            <Tooltip title="Display information based on current time">
                <Space>
                    <Switch onChange={onSwitchChange} />
                    <span>Real-time</span>
                </Space>
            </Tooltip>
        </ToggleContainer>
    );
}
