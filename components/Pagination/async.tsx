import dynamic from 'next/dynamic';

export const PaginationAsync = dynamic(() => import('./'));
