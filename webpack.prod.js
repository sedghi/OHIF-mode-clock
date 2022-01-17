const path = require("path");
const pkg = require("./package.json");

const outputFile = "index.umd.js";

const config = {
    mode: "production",
    entry: __dirname + "/" + pkg.module,
    devtool: "inline-source-map",
    output: {
        path: __dirname + "/dist",
        filename: outputFile,
        library: pkg.name,
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve("./node_modules"), path.resolve("./src")],
        extensions: [".json", ".js"]
    }
};

module.exports = config;
