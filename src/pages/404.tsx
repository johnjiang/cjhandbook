import React, { ReactElement } from "react";
import { Layout } from "antd";

import SEO from "../components/seo";

export default function NotFoundPage(): ReactElement {
    return (
        <Layout>
            <SEO title="404: Not found" />
            <h1>NOT FOUND</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
    );
}
