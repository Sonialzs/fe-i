// antd 自定义主题
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");
const withLess = require("@zeit/next-less");
const withPlugins = require("next-compose-plugins");

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/antd.less"), "utf8")
);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const plugins = [
  withBundleAnalyzer(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
          });
        }

        // 解决@mdx/runtime can't resolve 'fs'问题
        if (!isServer) {
          config.node = {
            fs: 'empty'
          }
        }
  
        return config;
      },
      
    })
  )
];
module.exports = withPlugins(plugins);
