import { Box, Link, LinkProps } from '@chakra-ui/react';
import { getFolderNameByRoute } from '@service/category.config';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { FiGithub } from 'react-icons/fi';

interface Props {}

export default function AnswerEditLink({
	...props
}: Props & LinkProps): ReactElement {
	const { query } = useRouter();
	const category = getFolderNameByRoute(query.category as string);
	const index = query.question as string;

	return (
		<Link
			href={`https://github.com/Xwil/fe-i/edit/master/content/${category}/questions/${index}/answer.mdx`}
			isExternal
			{...props}
		>
			欢迎在Github上编辑
			<Box as="span" mx={1} fontSize="0.9em" verticalAlign="text-bottom">
				<FiGithub style={{ display: 'inline' }} />
			</Box>
		</Link>
	);
}
