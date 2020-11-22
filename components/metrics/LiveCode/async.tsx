import dynamic from 'next/dynamic';

export const LiveCodeAsync = dynamic(
	() => /* WebpackChunkName:LiveCode */ import('.')
);
