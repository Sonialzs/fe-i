import PageLayout from '@layouts/page';
import { GetStaticPaths } from 'next';
import React, { ReactElement } from 'react';
import { getCategories } from 'service/cateogry';
import { getAllTagsByCategory } from 'service/tag';

interface Props {}

export default function Tag({}: Props): ReactElement {
	return <PageLayout></PageLayout>;
}

export const getStaticPaths = () => {
	const categories = getCategories();
	const result: { params: { category: string; tag: string } }[] = [];

	categories.map((category) => {
		const tags = getAllTagsByCategory(category);
		result.push({ params: { category, tag: 'hello' } });
	});

	return {
		paths: result,
		fallback: false,
	};
};
