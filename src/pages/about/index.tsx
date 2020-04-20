import React, { ReactElement } from "react";
import { TwitterOutlined } from "@ant-design/icons";

export default function AboutPage(): ReactElement {
    return (
        <div>
            <p>
                Created by{" "}
                <a
                    href="https://twitter.com/johnjiang101"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    John Jiang <TwitterOutlined />
                </a>
                , for those that are stuck inside where the only solace is to
                catch more sea bass.
            </p>
            <p>
                DM me regarding bugs, feedback, or even if you just want to say
                thanks.
            </p>
        </div>
    );
}
