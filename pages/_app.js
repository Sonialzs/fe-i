import {
	ChakraProvider,
	localStorageManager,
	useColorMode,
} from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import { prismDarkTheme, prismLightTheme } from 'styles/prism';
import theme from 'styles/theme';

const GlobalStyle = ({ children }) => {
	const { colorMode } = useColorMode();

	return (
		<>
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

					body {
						font-family: 'Helvetica Neue', Helvetica, Arial,
							'PingFang SC', 'Hiragino Sans GB', 'Heiti SC',
							'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
					}
					#__next {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
						background: ${colorMode === 'light'
							? 'white'
							: '#171923'};
					}

					svg {
						display: inline-block;
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
			<ChakraProvider
				theme={theme}
				colorModeManager={localStorageManager}
				resetCSS={true}
			>
				<GlobalStyle>
					<Head>
						<title>FEI - 前端知识库</title>
						<meta
							httpEquiv="Content-Type"
							content="text/html; charset=UTF-8"
						/>
						<meta content="IE=edge" httpEquiv="X-UA-Compatible" />
						<meta
							content="width=device-width, initial-scale=1"
							name="viewport"
						/>
						<meta content="#ffffff" name="theme-color" />
						<meta
							content="#ffffff"
							name="msapplication-TileColor"
						/>
						<script
							dangerouslySetInnerHTML={{
								__html: `
							var _hmt = _hmt || [];
							(function() {
							var hm = document.createElement("script");
							hm.src = "https://hm.baidu.com/hm.js?${process.env.BAIDU_KEY}";
							var s = document.getElementsByTagName("script")[0]; 
							s.parentNode.insertBefore(hm, s);
							})();`,
							}}
						/>
					</Head>
					<DefaultSeo {...SEO} />
					<Component {...pageProps} />
					<NextNProgress height="1" color={theme.colors.teal[200]} />
				</GlobalStyle>
			</ChakraProvider>
		</>
	);
}
