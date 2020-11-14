import {
	Stack,
	Flex,
	Heading,
	Text,
	Avatar,
	Box,
	Link,
	useColorMode,
} from '@chakra-ui/react';
import MDXProvider from '@components/MDXProvider';
import ViewCounter from '@components/ViewCounter';
import { format } from 'path';
import React, { ReactElement } from 'react';
import PageLayout from './page.layout';

interface Props {
	children?: any;
	frontMatter: any;
}

// 分类主页的布局
export default function CategoryLayout({
	children,
	frontMatter,
}: Props): ReactElement {
	const { colorMode } = useColorMode();
	const textColor = {
		light: 'gray.700',
		dark: 'gray.400',
	};

	return (
		<PageLayout>
			<Stack
				as="article"
				spacing={8}
				justifyContent="center"
				alignItems="flex-start"
				m="0 auto 4rem auto"
				maxWidth="700px"
				w="100%"
			>
				<Flex
					flexDirection="column"
					justifyContent="flex-start"
					alignItems="flex-start"
					maxWidth="700px"
					w="100%"
				>
					<Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
						{frontMatter.title}
					</Heading>
					<Flex
						justify="space-between"
						align={['initial', 'center']}
						direction={['column', 'row']}
						mt={2}
						w="100%"
						mb={4}
					>
						<Flex align="center">
							<Text fontSize="sm" color={textColor[colorMode]}>
								{frontMatter.by}
								{'cuvii / '}
								{/* {format(
									parseISO(frontMatter.publishedAt),
									'MMMM dd, yyyy'
								)} */}
								{frontMatter.publishedAt}
							</Text>
						</Flex>
						<Text
							fontSize="sm"
							color="gray.500"
							minWidth="100px"
							mt={[2, 0]}
						>
							{frontMatter.readingTime.text}
							{` • `}
							{/* <ViewCounter id={slug} /> */}
						</Text>
					</Flex>
				</Flex>
				<MDXProvider>{children}</MDXProvider>
			</Stack>
		</PageLayout>
	);
}
