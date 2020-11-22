import { Flex, Heading, Stack, Text, useColorMode } from '@chakra-ui/react';
import MDXProvider from '@components/metrics/MDXProvider';
import { ViewCounterAsync } from '@components/ViewCounter/async';
import React, { ReactElement } from 'react';
import PageLayout from './page';

interface Props {
	children?: any;
	frontMatter: any;
}

// 分类主页的布局
export default function BlogLayout({
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
				px={4}
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
							fontSize="xs"
							color="gray.500"
							minWidth="100px"
							mt={[2, 0]}
						>
							{frontMatter.readingTime.text}
							{` • `}
							<ViewCounterAsync
								fontSize="xs"
								slug={frontMatter.slug}
							/>
						</Text>
					</Flex>
				</Flex>
				<MDXProvider>{children}</MDXProvider>
			</Stack>
		</PageLayout>
	);
}
