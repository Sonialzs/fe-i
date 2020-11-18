import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import NextLink from 'next/link';

interface Props {
	totalPages: number;
}

export default function Pagination({ totalPages }: Props): ReactElement {
	const router = useRouter();
	const page = parseInt(router.query.page as string);

	const cutPath = () => {
		return router.asPath.slice(0, router.asPath.lastIndexOf('/') + 1);
	};
	return (
		<Box mt="4em">
			{page > 1 && (
				<NextLink href={cutPath() + (page - 1)}>
					<Button
						fontSize="sm"
						color="gray.500"
						colorScheme="gray"
						variant="ghost"
					>
						上一页
					</Button>
				</NextLink>
			)}
			{page < totalPages && (
				<NextLink href={cutPath() + (page + 1)}>
					<Button
						fontSize="sm"
						color="gray.500"
						colorScheme="gray"
						variant="ghost"
					>
						下一页
					</Button>
				</NextLink>
			)}
		</Box>
	);
}
