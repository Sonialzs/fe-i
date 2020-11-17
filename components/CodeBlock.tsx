import { Box } from '@chakra-ui/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { ReactElement } from 'react';
import { LiveCodeAsync } from './LiveCode/async';

interface Props {
	children: any;
	className?;
	live?: boolean;
}

export default function CodeBlock({
	children,
	className,
	live,
	...props
}: Props): ReactElement {
	const language = className?.replace(/language-/, '');

	if (live) {
		return <LiveCodeAsync>{children}</LiveCodeAsync>;
	}

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
					{tokens.map((line, i) => {
						// 解决最后一行幽灵节点问题
						if (i === tokens.length - 1 && line[0].empty) {
							return;
						}
						return (
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
						);
					})}
				</Box>
			)}
		</Highlight>
	);
}
