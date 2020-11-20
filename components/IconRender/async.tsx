import dynamic from 'next/dynamic';

export const IconRenderAsync = dynamic(
	() => /* webpackChunkName: "IconRender" */ import('./'),
	{
		ssr: false,
	}
);
