var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

var root = require('app-root-path');

var config = {
    resolve: {
        symlinks: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            __LOCALE_DIR__: JSON.stringify(root+"/locale")
        })
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: [
                        ['babel-plugin-transform-builtin-extend', {
                            globals: ['Error', 'Array'],
                        }],
                    ],
                },
            }
        ]
    }
};

module.exports = config;
