import { Flex, Stack, Text, useColorMode } from '@chakra-ui/react';
import { CategoryJumpAsync } from '@components/CategoryJump/async';
import { MDXRenderAsync } from '@components/MDXRender/async';
import { OutlineWarningAsync } from '@components/OutlineWarning/async';
import { ViewCounterAsync } from '@components/ViewCounter/async';
import PageLayout from '@layouts/page';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import CategoriesConfig from 'service/category.config';
import { getCategoryIndex, getCategoryQuestionsCount } from 'service/cateogry';

interface Props {
	attributes: any;
	body: string;
	// 当前分类问题的数量
	total: number;
}

export default function Category({
	attributes,
	body,
	total,
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
								{'cuvii / '}
								{/* {format(
									parseISO(frontMatter.publishedAt),
									'MMMM dd, yyyy'
								)} */}
								{attributes.date}
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
				<MDXRenderAsync mdx={body} />
				<OutlineWarningAsync />
			</Stack>
		</PageLayout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const category = context.params!.category as string;
	const fm = getCategoryIndex(category);
	const total = getCategoryQuestionsCount(category);

	return {
		props: {
			attributes: fm?.attributes,
			body: fm?.body,
			total,
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
