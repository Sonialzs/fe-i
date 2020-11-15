import dynamic from 'next/dynamic';

export const AnswerRenderAsync = dynamic(() => import('./'));
