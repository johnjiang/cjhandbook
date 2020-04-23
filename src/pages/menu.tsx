import React, { ReactElement } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function HeaderMenu(): ReactElement {
    return (
        <>
            <Menu mode="horizontal" theme="dark" style={{ lineHeight: "64px" }}>
                <Menu.Item>
                    <Link to="/" />
                    {"CJ's Handbook"}
                </Menu.Item>
                <Menu.Item>
                    <a
                        href="https://turnipprophet.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Turnip Prophet
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        href="https://turnip.exchange/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Turnip Exchange
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        href="https://wuffs.org/acnh/mysterytour.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Mystery Tour
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/about" />
                    About
                </Menu.Item>
            </Menu>
        </>
    );
}
