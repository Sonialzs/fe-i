import {
	ColorModeProvider,
	CSSReset,
	ThemeProvider,
	useColorMode,
} from '@chakra-ui/core';
import MDXComponents from '@components/MDXComponents';
import { css, Global } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import theme from 'theme';

const GlobalStyle = ({ children }) => {
	const { colorMode } = useColorMode();

	return (
		<>
			<CSSReset />
			<Global
				styles={css`
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
		<ThemeProvider theme={theme}>
			<MDXProvider components={MDXComponents}>
				<ColorModeProvider value="light">
					<GlobalStyle />
					<Component {...pageProps} />
				</ColorModeProvider>
			</MDXProvider>
		</ThemeProvider>
	);
}
