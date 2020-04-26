import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any,no-unused-vars
module.exports = (env: any, argv: any): any => {
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
                        MiniCssExtractPlugin.loader,
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
            new CopyWebpackPlugin([
                {
                    from: "public",
                    to: ".",
                },
            ]),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: "compiled_css.css",
            }),
        ],
        devtool: "source-map",
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            historyApiFallback: true,
            overlay: true,
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
            minimize: true,
            minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
    };
};
