import MDXRender from '@components/MDXRender';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getCategories, getCategoryIndex } from 'service/cateogry';

interface Props {
	attributes: Object;
	body: string;
}

export default function Category({ attributes, body }: Props): ReactElement {
	return (
		<div>
			<MDXRender mdx={body} />
		</div>
	);
}

// TODO 分类介绍页暂时无内容，先忽略
export const getStaticProps: GetStaticProps = async (context) => {
	const category = context.params!.category as string;
	const fm = await getCategoryIndex(category);

	return {
		props: {
			attributes: fm?.attributes,
			body: fm?.body,
		},
	};
};

export async function getStaticPaths() {
	const categories = await getCategories();
	const paths = categories?.map((category) => ({ params: { category } }));
	return {
		paths: paths,
		fallback: false,
	};
}
