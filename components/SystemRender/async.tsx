import { Skeleton } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

export const SystemRenderAsync = dynamic(() => import('.'), {
	loading: () => <Skeleton isLoaded={false} w="100%" h="200px" />,
});
