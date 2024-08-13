/* eslint-disable */
const tailwindcss = require("tailwindcss");

module.exports = {
    eslint: {
        enable: false,
    },
    style: {
        postcssOptions: {
            plugins: [
                tailwindcss("./tailwind.config.js"),
                require("autoprefixer"),
            ],
        },
    },
};
