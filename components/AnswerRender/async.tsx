import dynamic from 'next/dynamic';

export const AnswerRenderAsync = dynamic(
	() => /* WebpackChunkName:AnswerRender */ import('.')
);
