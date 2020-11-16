import dynamic from 'next/dynamic';

export const AuthorsAsync = dynamic(() => import('./'));
