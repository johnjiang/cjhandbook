import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";

import Optimization = webpack.Options.Optimization;

const WEBPACK_MODES = {
    development: "development",
    production: "production",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (env: any, argv: any): any => {
    const mode = argv.mode || WEBPACK_MODES.development;
    const isProd = mode === WEBPACK_MODES.production;

    const optimization: Optimization = {
        splitChunks: {
            chunks: "all",
        },
    };

    if (isProd) {
        optimization.minimize = true;
        optimization.minimizer = [
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({}),
        ];
    }

    return {
        entry: {
            app: "./src/index.tsx",
        },
        output: {
            path: path.join(__dirname, "dist"),
            filename: "[name].bundle.js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.([tj])sx?$/,
                    exclude: /node_modules/,
                    use: { loader: "awesome-typescript-loader" },
                },
                {
                    test: /\.(css|scss|less)$/,
                    use: [
                        {
                            loader: ExtractCssChunks.loader,
                            options: {
                                hmr: !isProd,
                                reloadAll: true,
                            },
                        },
                        "css-loader",
                        "less-loader",
                    ],
                },
            ],
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".tsx", ".ts", ".jsx", ".js"],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: "public",
                        to: ".",
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
            }),
            new ExtractCssChunks(),
        ],
        devtool: "source-map",
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            historyApiFallback: true,
            overlay: true,
        },
        optimization,
    };
};
