import {
	Box,
	Flex,
	Text,
	Heading,
	Stack,
	useColorMode,
} from '@chakra-ui/react';
import { QuestionCardAsync } from '@components/QuestionCard/async';
import PageLayout from '@layouts/page';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getIconByRoute, getRouterNameByFolder } from 'service/category.config';
import { getCategories } from 'service/cateogry';
import { getQuestion } from 'service/question';
import { buildTagConfig, getTagConfig, TagConfigType } from 'service/tag';
import { Question } from 'service/types';

interface Props {
	category: string;
	config: TagConfigType;
	questions: Question[];
}

export default function Tag({
	category,
	config,
	questions,
}: Props): ReactElement {
	const { colorMode } = useColorMode();
	const titleBoxColor = {
		light: 'gray.50',
		dark: 'gray.800',
	};

	return (
		<PageLayout>
			<Flex
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				maxWidth="900px"
				mx="auto"
			>
				<Flex
					w="100%"
					height="10em"
					backgroundColor={titleBoxColor[colorMode]}
					borderRadius={8}
					mb={16}
				>
					<div>
						{React.createElement(getIconByRoute(category), {
							width: '10em',
							height: '10em',
						})}
					</div>
					<div className="intro">
						<Heading as="h2" fontSize="xl" mt="1em">
							{config.title}
						</Heading>
						<Text fz="sm" color="gray.500">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Necessitatibus minus nisi unde soluta autem ut
							corrupti accusamus aperiam numquam architecto!
						</Text>
					</div>
				</Flex>
				<Stack spacing={8}>
					{questions &&
						questions.map((question) => (
							<QuestionCardAsync
								question={question}
								href={`/${category}/question/${question.attributes.index}`}
								key={question.attributes.slug}
							/>
						))}
				</Stack>
			</Flex>
		</PageLayout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	let { category, tag } = context.params!;
	const categoryStr = category as string;

	const tagConfig = getTagConfig(categoryStr)?.find(
		(config) => config.routeName === tag
	);

	const questions = tagConfig!.questions!.map((question) =>
		getQuestion(categoryStr, question)
	);

	return {
		props: {
			category: categoryStr,
			config: tagConfig || null,
			questions,
		},
	};
};

export const getStaticPaths = () => {
	const categories = getCategories();
	const result: { params: { category: string; tag: string } }[] = [];

	categories.map((category) => {
		const tagConfigs = buildTagConfig(category);
		tagConfigs?.forEach((config) => {
			if (config.questions && config.childs.length > 0) {
				result.push({
					params: {
						category: getRouterNameByFolder(category),
						tag: config.routeName,
					},
				});
			}
		});
	});

	return {
		paths: result,
		fallback: false,
	};
};
