import { Box, Link, LinkProps } from '@chakra-ui/react';
import { getFolderNameByRoute } from '@service/category.config';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface Props {}

export default function QuestionEditLink({
	...props
}: Props & LinkProps): ReactElement {
	const { query } = useRouter();
	const category = getFolderNameByRoute(query.category as string);
	const index = query.question as string;

	return (
		<Link
			href={`https://github.com/Xwil/fe-i/edit/master/content/${category}/${index}/question.mdx`}
			isExternal
			{...props}
		>
			编辑该问题
		</Link>
	);
}
