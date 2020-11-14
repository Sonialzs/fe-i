import dynamic from 'next/dynamic';

export const ViewCounterAsync = dynamic(() => import('./'));
