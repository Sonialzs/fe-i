import { Box } from '@chakra-ui/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { ReactElement } from 'react';

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
					textAlign="left"
					// m="1em 0"
					p="0.5em"
					overflow="scroll"
					className={className}
					style={style}
				>
					{tokens.map((line, i) => (
						<Box
							as="div"
							display="table-row"
							key={i}
							{...getLineProps({ line, key: i })}
						>
							<Box
								as="span"
								display="table-cell"
								textAlign="right"
								paddingRight="1em"
								userSelect="none"
								opacity={0.5}
							>
								{i + 1}
							</Box>
							<Box as="span" display="table-cell">
								{line.map((token, key) => (
									<span
										key={key}
										{...getTokenProps({ token, key })}
									/>
								))}
							</Box>
						</Box>
					))}
				</Box>
			)}
		</Highlight>
	);
}
