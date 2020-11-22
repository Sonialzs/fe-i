import React from 'react';
import MDX from '@mdx-js/runtime';
import MDXProvider from '../MDXProvider';

export default function MDXRender(props) {
	return (
		<>
			{props.mdx && (
				<MDXProvider>
					<MDX
						scope={props.scope}
						remarkPlugins={[
							require('remark-autolink-headings'),
							require('remark-slug'),
							require('remark-code-titles'),
							require('remark-emoji'),
						]}
					>
						{props.mdx}
					</MDX>
				</MDXProvider>
			)}
		</>
	);
}
