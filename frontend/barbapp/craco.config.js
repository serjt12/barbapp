const tailwindcss = require("tailwindcss");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    style: {
        postcssOptions: {
            plugins: [
                tailwindcss("./tailwind.config.js"),
                require("autoprefixer"),
            ],
        },
    },
    webpack: {
        plugins: [
            ...(process.env.NODE_ENV === "development"
                ? [new ReactRefreshWebpackPlugin()]
                : []),
        ],
    },
};
