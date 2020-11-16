import dynamic from 'next/dynamic';

export const FooterAsync = dynamic(() => import('./'));
