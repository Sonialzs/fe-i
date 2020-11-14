const readingTime = require('reading-time');
const withPlugins = require('next-compose-plugins');
const withMdxEnhanced = require('next-mdx-enhanced');

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
	withMdxEnhanced({
		layoutPath: 'layouts',
		defaultLayout: true,
		fileExtensions: ['mdx'],
		remarkPlugins: [
			require('remark-autolink-headings'),
			require('remark-slug'),
			require('remark-code-titles'),
		],
		usesSrc: false,
		extendFrontMatter: {
			process: (mdxContent) => ({
				wordCount: mdxContent.split(/\s+/gu).length,
				readingTime: readingTime(mdxContent),
			}),
			// phase: 'prebuild|loader|both',
		},
		reExportDataFetching: false,
	}),
];
module.exports = withPlugins(plugins);
