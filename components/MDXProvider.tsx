import React, { ReactElement } from 'react';

import { MDXProvider as Provider } from '@mdx-js/react';
import MDXComponents from './MDXComponents';

interface Props {
	children?;
}

export default function MDXProvider({ children }: Props): ReactElement {
	return <Provider components={MDXComponents}>{children}</Provider>;
}
