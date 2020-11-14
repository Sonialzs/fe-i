import { Skeleton } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';

export const TagsAsync = dynamic(() => import('./'), {
	loading: () => <Skeleton height="20px" w="100px" />,
});
