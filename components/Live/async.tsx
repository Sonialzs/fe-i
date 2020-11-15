import dynamic from 'next/dynamic';

export const LiveAsync = dynamic(() => import('./'));
