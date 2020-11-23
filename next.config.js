const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const plugins = [
	withBundleAnalyzer({
		webpack: (config, { isServer }) => {
			// 解决@mdx/runtime can't resolve 'fs'问题
			if (!isServer) {
				config.node = {
					fs: 'empty',
				};
			}

			return config;
		},
	}),
];
module.exports = withPlugins(plugins);
