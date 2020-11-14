import {
	ColorModeProvider,
	CSSReset,
	ThemeProvider,
	useColorMode,
} from '@chakra-ui/core';
import { css, Global } from '@emotion/core';
import React from 'react';
import { prismDarkTheme, prismLightTheme } from 'styles/prism';
import theme from 'styles/theme';
import Head from 'next/head';

const GlobalStyle = ({ children }) => {
	const { colorMode } = useColorMode();

	return (
		<>
			<CSSReset />
			<Global
				styles={css`
					${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
					::selection {
						background-color: #47a3f3;
						color: #fefefe;
					}
					html {
						min-width: 360px;
						scroll-behavior: smooth;
					}
					#__next {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
						background: ${colorMode === 'light'
							? 'white'
							: '#171923'};
					}
				`}
			/>
			{children}
		</>
	);
};

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>FEI - 前端知识库</title>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							var _hmt = _hmt || [];
							(function() {
							var hm = document.createElement("script");
							hm.src = "https://hm.baidu.com/hm.js?${process.env.BAIDU_KEY}";
							var s = document.getElementsByTagName("script")[0]; 
							s.parentNode.insertBefore(hm, s);
							})();
        `,
					}}
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<ColorModeProvider value="light">
					<GlobalStyle />
					<Component {...pageProps} />
				</ColorModeProvider>
			</ThemeProvider>
		</>
	);
}
