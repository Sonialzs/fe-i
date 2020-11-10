import PageLayout from '@layouts/page.layout';
import React, { ReactElement } from 'react';
import CategoriesConfig from 'site.config';

interface Props {
	categories: Array<string>;
}

export default function index({ categories }: Props): ReactElement {
	return (
		<>
			<PageLayout></PageLayout>
		</>
	);
}
