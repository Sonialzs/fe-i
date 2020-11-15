import { Flex, Stack } from '@chakra-ui/react';
import { QuestionCardAsync } from '@components/QuestionCard/async';
import PageLayout from '@layouts/page';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import CategoriesConfig from 'service/category.config';
import { getQuestion, getQuestionsByCategory } from 'service/question';
import { Question } from 'service/types';

const questionPerPage = parseInt(process.env.QUESTION_PER_PAGE!);

interface Props {
	questions?: Question[];
	categories: string[];
	category: string;
}

export default function Page({ questions, category }: Props): ReactElement {
	return (
		<PageLayout>
			<Flex
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				maxWidth="900px"
				mx="auto"
			>
				{(!questions || questions.length === 0) && (
					<div>一滴都没了</div>
				)}
				<Stack spacing={4}>
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

// 当前页码渲染题目的起点，比如第一页应该是第0-第3个，
export function getOffsetByPage(page: number) {
	const offset = (page - 1) * questionPerPage;
	if (offset < 0) {
		return 0;
	}

	return offset;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { category, page } = context.params!;

	const offset = getOffsetByPage(parseInt(page as string));

	const questionFolders = getQuestionsByCategory(
		category as string,
		offset,
		questionPerPage,
		true
	);

	const result = questionFolders?.map((questionFolder) => {
		const questionFm = getQuestion(category as string, questionFolder);

		return {
			attributes: questionFm!.attributes,
			body: questionFm!.body,
		};
	});

	return {
		props: {
			questions: result,
			category,
		},
	};
};

// 获取路径，/[category]/page/[page]
export const getStaticPaths = () => {
	const routes = CategoriesConfig.available.map((category) => {
		const questionFolders = getQuestionsByCategory(category.routeName);
		const totalPages = Math.ceil(questionFolders!.length / questionPerPage);
		const result: any[] = [];

		for (let index = 1; index <= totalPages; index++) {
			result.push({
				params: {
					category: category.routeName,
					page: index.toString(),
				},
			});
		}

		return result;
	});

	const result = routes?.flat();

	return {
		paths: result || [],
		fallback: false,
	};
};
