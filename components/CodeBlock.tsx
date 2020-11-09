import { Box, useColorMode } from '@chakra-ui/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { ReactElement } from 'react';
import { prismDarkTheme, prismLightTheme } from 'styles/prism';

const theme = {
	light: prismLightTheme,
	dark: prismDarkTheme,
};

interface Props {
	children;
	className;
}

export default function CodeBlock({
	children,
	className,
	...props
}: Props): ReactElement {
	const language = className?.replace(/language-/, '');
	const { colorMode } = useColorMode();

	return (
		<Highlight
			{...defaultProps}
			code={children}
			language={language}
			theme={undefined}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Box
					as="pre"
					className={className}
					// style={{ ...style }}
					rounded="md"
					mt="2"
					mb="2"
					pl="2"
				>
					{tokens.map((line, i) => (
						<div key={i} {...getLineProps({ line, key: i })}>
							{line.map((token, key) => {
								return (
									<span
										key={key}
										{...getTokenProps({ token, key })}
									/>
								);
							})}
						</div>
					))}
				</Box>
			)}
		</Highlight>
	);
}
