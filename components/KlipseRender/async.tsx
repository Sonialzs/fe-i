import dynamic from 'next/dynamic';

export const KlipseRenderAsync = dynamic(() => import('.'), { ssr: false });
