import { Box, useColorMode } from '@chakra-ui/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';
import palenight from 'prism-react-renderer/themes/palenight';
import React, { ReactElement } from 'react';

const theme = {
	light: github,
	dark: palenight,
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
			theme={theme[colorMode]}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Box
					as="pre"
					className={className}
					style={{ ...style }}
					rounded="md"
					mt="2"
					mb="2"
				>
					{tokens.map((line, i) => (
						<div key={i} {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span
									key={key}
									{...getTokenProps({ token, key })}
								/>
							))}
						</div>
					))}
				</Box>
			)}
		</Highlight>
	);
}
