import { Flex, Link as NavLink } from '@chakra-ui/react';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface Props {
	categories: Array<string>;
}

export default function Header({ categories }: Props): ReactElement {
	return (
		<Flex as="header">
			{categories?.map((category) => (
				<Link href={`/${category}/page/1`} key={category}>
					<NavLink>{category}</NavLink>
				</Link>
			))}
		</Flex>
	);
}
