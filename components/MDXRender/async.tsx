import { Skeleton } from '@chakra-ui/core';
import dynamic from 'next/dynamic';
import React from 'react';

export const MDXRenderAsync = dynamic(() => import('./'), {
	loading: () => (
		<Skeleton height="200px" minW={['300px', '300px', '350px', '500px']} />
	),
});
