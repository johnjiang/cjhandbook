import React, { ChangeEvent, ReactElement } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
    onChange: (value: string) => void;
}

export default function SearchInput({ onChange }: Props): ReactElement {
    function onFilterEventChange(event: ChangeEvent<HTMLInputElement>): void {
        onChange(event.target.value);
    }

    return (
        <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            onChange={onFilterEventChange}
        />
    );
}
