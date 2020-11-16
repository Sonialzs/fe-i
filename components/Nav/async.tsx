import dynamic from 'next/dynamic';

export const NavbarAsync = dynamic(() => import('./'));
