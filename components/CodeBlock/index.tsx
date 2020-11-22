import { KlipseRenderAsync } from '@components/metrics/KlipseRender/async';
import { LiveCodeAsync } from '@components/metrics/LiveCode/async';
import React, { ReactElement } from 'react';
import Highlighter from './highlighter';

interface Props {
	children: any;
	className?;
	live?: boolean;
	run?: boolean;
}

export default function CodeBlock({
	children,
	className,
	live,
	run,
	...props
}: Props): ReactElement {
	if (live) {
		// 使用react-live渲染 -> 可实时编辑/预览jsx
		return <LiveCodeAsync>{children}</LiveCodeAsync>;
	}

	if (run) {
		// 使用klipse渲染 -> 可实时编辑/预览 html/css/js
		return (
			<KlipseRenderAsync className={className}>
				{children}
			</KlipseRenderAsync>
		);
	}

	// 使用prism-react-renderer渲染 -> 无任何交互
	return <Highlighter className={className}>{children}</Highlighter>;
}
