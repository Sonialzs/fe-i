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
    
    categories.

	return {
		paths: [{ params: {} }],
		fallback: false,
	};
};
