import React, { ReactElement } from "react";
import { Menu } from "antd";

export default function HeaderMenu(): ReactElement {
    return (
        <>
            <Menu mode="horizontal" theme="dark" style={{ lineHeight: "64px" }}>
                <Menu.Item>Home</Menu.Item>
            </Menu>
        </>
    );
}
