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
				<pre className={className} style={style}>
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
				</pre>
			)}
		</Highlight>
	);
}
