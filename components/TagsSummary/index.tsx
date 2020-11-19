import { Box, Flex, Tag } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { TagConfigType } from 'service/tag';

interface Props {
	tagsConfig: TagConfigType[];
}

export default function TagsSummary({ tagsConfig }: Props): ReactElement {
	const path = useRouter().asPath;

	return (
		<Box color={'gray.500'}>
			{/* <Heading as={'h3'} fontSize={'0.92em'} fontWeight="500">
				按话题查看
			</Heading> */}
			<Flex wrap="wrap">
				{tagsConfig.map((tags) => (
					<Box as="div" mr={4} mb={2} key={tags.title}>
						<NextLink href={path + `/tag/${tags.routeName}`}>
							<Tag
								fontWeight="500"
								cursor="pointer"
								color="gray.600"
							>
								{tags.title}
								<Box ml="2">{tags.childs.length}</Box>
							</Tag>
						</NextLink>
					</Box>
				))}
			</Flex>
		</Box>
	);
}
