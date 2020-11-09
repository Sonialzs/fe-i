import MDX from '@mdx-js/runtime';
import React from 'react';
import MDXComponents from './MDXComponents';

export default function MDXRender(props) {
	return (
		<>{props.mdx && <MDX components={MDXComponents}>{props.mdx}</MDX>}</>
	);
}
