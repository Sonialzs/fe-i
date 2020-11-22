import { Link, Text } from '@chakra-ui/react';
import EditLink from '@components/EditLink';
import React, { ReactElement } from 'react';

interface Props {
	authors: string[];
	authorsUrl: string[];
}

export default function AuthorsRender({
	authors,
	authorsUrl,
}: Props): ReactElement {
	return (
		<Text fontSize="sm" color="gray.500">
			解答由
			{authors.map((author, idx) => (
				<Link key={author} mx={1} href={authorsUrl![idx]}>
					{author}
				</Link>
			))}
			创作，
			<EditLink.Answer />
		</Text>
	);
}
