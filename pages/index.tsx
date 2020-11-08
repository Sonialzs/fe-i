import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import Link from 'next/link';
import { getCategories } from 'service/cateogry';
import Header from '@components/Header';
import PageLayout from '@layouts/page.layout';

interface Props {
	categories: Array<string>;
}

export default function index({ categories }: Props): ReactElement {
	return <PageLayout categories={categories}></PageLayout>;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const categories = await getCategories();

	return {
		props: {
			categories,
		},
	};
};
