import React from 'react';
import dynamic from 'next/dynamic';
const MDX = dynamic(() => import('@mdx-js/runtime'));
const MDXProvider = dynamic(() => import('../MDXProvider'));

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
						]}
					>
						{props.mdx}
					</MDX>
				</MDXProvider>
			)}
		</>
	);
}
