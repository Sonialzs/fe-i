import { Box, Link } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FiGithub } from 'react-icons/fi';

interface Props {
	category: string;
	index: number | string;
}

export default function EditLink({ category, index }: Props): ReactElement {
	return (
		<Link
			href={`https://github.com/Xwil/fe-i/edit/master/content/${category}/${index}/answer.mdx`}
			isExternal
		>
			欢迎在Github上编辑
			<Box as="span" mx={1} fontSize="0.9em" verticalAlign="text-bottom">
				<FiGithub style={{ display: 'inline' }} />
			</Box>
		</Link>
	);
}
