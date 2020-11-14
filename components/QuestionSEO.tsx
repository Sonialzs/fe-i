import { ArticleJsonLd, NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';

interface Props {
	title: string;
	date: string;
	url: string;
}

export default function QuestionSEO({ title, date, url }: Props): ReactElement {
	return (
		<>
			<NextSeo title={`${title} - FE.I 前端面试集锦`} canonical={url} />
			<ArticleJsonLd
				authorName="cuvii"
				dateModified={date}
				datePublished={date}
				publisherName="cuvii"
				title={title}
				url={url}
				description="FE.I 前端面试集锦"
				// @ts-ignore
				images={[]}
				publisherLogo={'/favicon.ico'}
			/>
		</>
	);
}
