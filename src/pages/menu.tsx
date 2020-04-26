import React, { ReactElement, useEffect, useState } from "react";
import { Menu, Popover } from "antd";
import { Link, useHistory } from "react-router-dom";
import { ExportOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Media from "react-media";

import { MEDIA_QUERY } from "../helpers/media";
import "../css/popover.less";
import styled from "styled-components";

const MobileHeader = styled.div`
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function HeaderMenu(): ReactElement {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const history = useHistory();

    useEffect(() => {
        return history.listen(() => {
            setMenuVisible(false);
        });
    }, [history]);

    const activeKeys = [history.location.pathname];

    return (
        <Media query={MEDIA_QUERY}>
            {(isMobile): ReactElement => {
                const menu = (
                    <Menu
                        selectedKeys={activeKeys}
                        mode={isMobile ? "inline" : "horizontal"}
                        theme={isMobile ? "light" : "dark"}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item key="/">
                            <Link to="/" />
                            {"CJ's Handbook"}
                        </Menu.Item>
                        <Menu.Item key="/art">
                            <Link to="/art" />
                            {"Redd's Manual"}
                        </Menu.Item>
                        <Menu.Item>
                            <a
                                href="https://turnipprophet.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExportOutlined />
                                Turnip Prophet
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a
                                href="https://turnip.exchange/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExportOutlined />
                                Turnip Exchange
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a
                                href="https://wuffs.org/acnh/mysterytour.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExportOutlined />
                                Mystery Tour
                            </a>
                        </Menu.Item>
                    </Menu>
                );

                if (isMobile) {
                    return (
                        <MobileHeader>
                            <div
                                style={{
                                    position: "absolute",
                                    left: 30,
                                }}
                            >
                                <Popover
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                    }}
                                    overlayClassName="popover-menu"
                                    placement="bottomLeft"
                                    content={menu}
                                    trigger={"click"}
                                    visible={isMenuVisible}
                                    onVisibleChange={setMenuVisible}
                                >
                                    <UnorderedListOutlined
                                        style={{
                                            color: "#fff",
                                            fontSize: "20px",
                                        }}
                                        onClick={(): void =>
                                            setMenuVisible(true)
                                        }
                                    />
                                </Popover>
                            </div>
                            <span>{"CJ's Handbook"}</span>
                        </MobileHeader>
                    );
                }

                return menu;
            }}
        </Media>
    );
}
