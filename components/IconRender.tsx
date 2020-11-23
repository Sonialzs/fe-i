import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface Props {
	size?: string;
	iconName?: string;
}

export default function IconRender({
	size = '2em',
	iconName,
}: Props): ReactElement {
	if (!iconName) {
		iconName = useRouter().query.category as string;
	}
	return (
		<>
			<img
				src={`/static/svg/${iconName}.svg`}
				style={{ width: size, height: size }}
			/>
		</>
	);
}
