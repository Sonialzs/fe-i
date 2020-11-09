import MDX from '@mdx-js/runtime';
import React from 'react';
import MDXComponents from './MDXComponents';

export default function MDXRender(props) {
	return (
		<>
			{props.mdx && (
				<MDX
					components={MDXComponents}
					scope={props.scope}
					remarkPlugins={[
						require('remark-autolink-headings'),
						require('remark-slug'),
						require('remark-code-titles'),
						,
					]}
				>
					{props.mdx}
				</MDX>
			)}
		</>
	);
}
