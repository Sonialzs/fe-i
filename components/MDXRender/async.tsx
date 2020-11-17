import { Skeleton } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';

export const MDXRenderAsync = dynamic(
	() => /* WebpackChunkName:MDXRender */ import('./'),
	{
		loading: () => (
			<Skeleton
				height="200px"
				minW={['300px', '300px', '350px', '100%']}
			/>
		),
	}
);
