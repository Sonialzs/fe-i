import { Skeleton } from '@chakra-ui/core';
import dynamic from 'next/dynamic';
import React from 'react';

// BUG loading完之后依然会白屏一段时间
export const MDXRenderAsync = dynamic(() => import('./'), {
	loading: () => (
		<Skeleton height="200px" minW={['300px', '300px', '350px', '500px']} />
	),
});
