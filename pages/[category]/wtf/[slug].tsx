import { MDXRenderAsync } from '@components/metrics/MDXRender/async';
import WTFLayout from '@layouts/wtf';
import CategoriesConfig, {
	getFolderNameByRoute,
} from '@service/category.config';
import { getReadingTime, getWordCount } from '@service/mdx';
import { getWTFByCategory, getWTFByFileName } from '@service/wtf';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';

interface Props {
	body;
	frontMatter;
}

export default function WTF({ body, frontMatter }: Props): ReactElement {
	return (
		<WTFLayout frontMatter={frontMatter}>
			<MDXRenderAsync mdx={body} />
		</WTFLayout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { category, slug } = context.params!;
	const folderName = getFolderNameByRoute(category as string);
	const fm = getWTFByFileName(folderName, slug as string);

	fm!.attributes.wordCount = getWordCount(fm?.body);
	fm!.attributes.readingTime = getReadingTime(fm?.body);

	return {
		props: {
			body: fm?.body,
			frontMatter: fm?.attributes,
		},
	};
};

export function getStaticPaths() {
	const paths: {
		params: { category: string; slug: string };
	}[] = [];
	CategoriesConfig.available.forEach((categoryConfig) => {
		getWTFByCategory(categoryConfig.folder).forEach((wtf) => {
			paths.push({
				params: {
					category: categoryConfig.routeName,
					slug: wtf?.attributes.slug,
				},
			});
		});
	});

	return {
		paths,
		fallback: false,
	};
}
