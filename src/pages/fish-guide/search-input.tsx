import React, { ChangeEvent, ReactElement } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
    query: string;
    onChange: (value: string) => void;
}

export default function SearchInput({ query, onChange }: Props): ReactElement {
    function onFilterEventChange(event: ChangeEvent<HTMLInputElement>): void {
        onChange(event.target.value);
    }

    return (
        <Input
            value={query}
            prefix={<SearchOutlined />}
            placeholder="Search..."
            onChange={onFilterEventChange}
        />
    );
}
