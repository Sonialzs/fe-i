import PageLayout from '@layouts/page.layout';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getCategories } from 'service/cateogry';

interface Props {
	categories: Array<string>;
}

export default function index({ categories }: Props): ReactElement {
	return (
		<>
			<PageLayout categories={categories}></PageLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const categories = await getCategories();

	return {
		props: {
			categories,
		},
	};
};
