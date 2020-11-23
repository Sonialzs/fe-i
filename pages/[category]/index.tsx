import { Flex, Stack, Text, useColorMode } from '@chakra-ui/react';
import { CategoryJumpAsync } from '@components/CategoryJump/async';
import { SystemRenderAsync } from '@components/SystemRender/async';
import { TagsSummaryAsync } from '@components/TagsSummary/async';
import { ViewCounterAsync } from '@components/ViewCounter/async';
import PageLayout from '@layouts/page';
import CategoriesConfig from '@service/category.config';
import { getCategoryIndex, getCategoryQuestionsCount } from '@service/cateogry';
import { getTagConfig, TagConfigType } from '@service/tag';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface Props {
	attributes: any;
	body: string;
	// 当前分类问题的数量
	total: number;
	tagsConfig: TagConfigType[];
	folderName: string;
}

export default function Category({
	attributes,
	body,
	total,
	tagsConfig,
	folderName,
}: Props): ReactElement {
	const { colorMode } = useColorMode();
	const router = useRouter();

	const textColor = {
		light: 'gray.700',
		dark: 'gray.400',
	};
	return (
		<>
			<NextSeo
				title={`${folderName}知识大纲 | FE.i 前端知识库`}
				description={`${folderName}知识体系大纲`}
				canonical={router.asPath}
			/>

			<PageLayout>
				<Stack
					as="article"
					spacing={8}
					justifyContent="center"
					alignItems="flex-start"
					m="0 auto 4rem auto"
					maxWidth="700px"
					w="100%"
					px={[' 1em', '0']}
				>
					<Flex
						flexDirection="column"
						justifyContent="flex-start"
						alignItems="flex-start"
						maxWidth="700px"
						w="100%"
					>
						<Flex
							justify="space-between"
							align={['initial', 'center']}
							direction={['column', 'row']}
							mt={2}
							w="100%"
							mb={4}
						>
							<Flex align="center">
								<Text
									fontSize="sm"
									color={textColor[colorMode]}
								>
									{attributes.authors.map(
										(author) => author + ' '
									)}
									{/* {format(
									parseISO(frontMatter.publishedAt),
									'MMMM dd, yyyy'
								)} */}
									{' / ' + attributes.date}
								</Text>
							</Flex>
							<Text
								fontSize="xs"
								color="gray.500"
								minWidth="100px"
								mt={[2, 0]}
							>
								<ViewCounterAsync
									fontSize="xs"
									slug={attributes.slug}
								/>
							</Text>
						</Flex>
					</Flex>
					<CategoryJumpAsync total={total} />
					<TagsSummaryAsync tagsConfig={tagsConfig} />
					<SystemRenderAsync mdx={body} />
				</Stack>
			</PageLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const category = context.params!.category as string;
	const fm = getCategoryIndex(category);
	const total = getCategoryQuestionsCount(category);
	const tagsConfig = getTagConfig(category);
	const folderName = CategoriesConfig.getFolderNameByRoute(category);

	return {
		props: {
			attributes: fm?.attributes,
			body: fm?.body,
			total,
			tagsConfig,
			folderName,
		},
	};
};

export async function getStaticPaths() {
	const paths = CategoriesConfig.available.map((category) => ({
		params: { category: category.routeName },
	}));
	return {
		paths: paths,
		fallback: false,
	};
}
