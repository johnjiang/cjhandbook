import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    test: /\.(css|scss)$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".tsx", ".ts", ".jsx", ".js"],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: "compiled_css.css",
            }),
        ],
        devtool: "source-map",
        devServer: {
            contentBase: "./dist",
            historyApiFallback: true,
            overlay: true,
        },
    };
};