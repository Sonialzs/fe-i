import dynamic from 'next/dynamic';

export const QuestionCardAsync = dynamic(
	() => /* WebpackChunkName:QuestionCard */ import('./')
);
