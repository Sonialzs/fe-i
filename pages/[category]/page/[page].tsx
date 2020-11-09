import { Flex, Stack } from '@chakra-ui/core';
import QuestionCard from '@components/QuestionCard';
import PageLayout from '@layouts/page.layout';
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getCategories } from 'service/cateogry';
import { getQuestionByCategory } from 'service/question';
import { Question } from 'service/types';

const questionPerPage = parseInt(process.env.QUESTION_PER_PAGE!);

interface Props {
	questions?: Question[];
	categories: string[];
	category: string;
}

export default function Page({
	questions,
	categories,
	category,
}: Props): ReactElement {
	return (
		<PageLayout categories={categories}>
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
							<QuestionCard
								question={question}
								href={`/${category}/question/${question.index}`}
								key={question.index?.toString()}
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

	const questionsFile = getQuestionByCategory(
		category as string,
		offset,
		questionPerPage,
		true
	);

	const result = questionsFile?.map((questionFile, index) => {
		const questionFm = fm(questionFile);
		// 题库从1开始，所以+1
		const fileIndex = offset + index + 1;

		return {
			index: fileIndex,
			attributes: questionFm.attributes,
			body: questionFm.body,
		};
	});

	const categories = getCategories();

	return {
		props: {
			questions: result,
			categories,
			category,
		},
	};
};

// 获取路径，/[category]/page/[page]
export const getStaticPaths = () => {
	const categories = getCategories();
	const routes = categories?.map((category) => {
		const questions = getQuestionByCategory(category);
		const totalPages = Math.ceil(questions!.length / questionPerPage);
		const result: any[] = [];

		for (let index = 1; index <= totalPages; index++) {
			result.push({
				params: {
					category,
					page: index.toString(),
				},
			});
		}

		return result;
	});

	const result = routes?.flat();

	return {
		paths: result || [],
		fallback: true,
	};
};
