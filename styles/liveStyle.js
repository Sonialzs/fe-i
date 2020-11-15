import { theme } from '@chakra-ui/react';

const base = {
	plain: {
		background: 'none',
		color: theme.colors.gray[800],
		fontFamily: theme.fonts.mono,
		fontSize: '0.9rem',
		textAlign: 'left',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		wordWrap: 'normal',
		lineHeight: theme.lineHeights[2],
		hyphens: 'none',
		width: '100%',
	},
	styles: [
		{
			types: ['comment', 'prolog', 'doctype', 'cdata'],
			style: {
				color: 'slategray',
			},
		},
		{
			types: ['punctuation'],
			style: {
				color: '#999',
			},
		},
		{
			types: ['namespace'],
			style: {
				opacity: '0.7',
			},
		},
		{
			types: [
				'property',
				'tag',
				'boolean',
				'number',
				'constant',
				'symbol',
				'deleted',
			],
			style: {
				color: '#905',
			},
		},
		{
			types: [
				'selector',
				'attr-name',
				'string',
				'char',
				'builtin',
				'inserted',
			],
			style: {
				color: '#690',
			},
		},
		{
			types: ['operator', 'entity', 'url', 'string'],
			style: {
				color: '#9a6e3a',
			},
		},
		{
			types: ['atrule', 'attr-value', 'keyword'],
			style: {
				color: '#07a',
			},
		},
		{
			types: ['function', 'class-name'],
			style: {
				color: '#dd4a68',
			},
		},
		{
			types: ['regex', 'important', 'variable'],
			style: {
				color: '#e90',
			},
		},
		{
			types: ['important', 'bold'],
			style: {
				fontWeight: 'bold',
			},
		},
		{
			types: ['italic'],
			style: {
				fontStyle: 'italic',
			},
		},
	],
};

// react-live的style
export const liveLight = {
	plain: {
		...base.plain,
		color: theme.colors.gray,
		background: theme.colors.gray[50],
	},
	styles: [...base.styles],
};
export const liveDark = {
	plain: {
		...base.plain,
		background: '#011627',
	},
	styles: [
		...base.styles,
		{
			types: ['attr-name'],
			style: {
				color: 'rgba(173, 219, 103)',
				fontStyle: 'italic',
			},
		},
		{
			types: ['comment'],
			style: {
				color: 'rgba(128, 147, 147)',
			},
		},
		{
			types: ['string', 'url'],
			style: {},
		},
		{
			types: ['variable'],
			style: {},
		},
		{
			types: ['number'],
			style: {},
		},
		{
			types: ['builtin', 'char', 'constant', 'function'],
			style: {},
		},
		{
			types: ['punctuation'],
			style: {},
		},
		{
			types: ['selector', 'doctype'],
			style: {},
		},
		{
			types: ['class-name'],
			style: {},
		},
		{
			types: ['tag', 'operator', 'keyword'],
			style: {},
		},
		{
			types: ['boolean'],
			style: {},
		},
		{
			types: ['property'],
			style: {},
		},
		{
			types: ['namespace'],
			style: {},
		},
	],
};
