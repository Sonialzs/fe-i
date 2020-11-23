import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { ReactElement } from 'react';

interface Props {
	size?: string;
	iconName?: string;
	fill?: 'fixed' | 'responsive' | 'intrinsic' | undefined;
}

export default function IconRender({
	size = '32',
	iconName,
	fill = undefined,
}: Props): ReactElement {
	if (!iconName) {
		iconName = useRouter().query.category as string;
	}
	return (
		<>
			<Image
				src={`/static/svg/${iconName}.svg`}
				width={size}
				height={size}
				alt={iconName}
				layout={fill}
			/>
		</>
	);
}
