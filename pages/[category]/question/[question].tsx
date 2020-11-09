import { Flex } from '@chakra-ui/core';
import QuestionCard from '@components/QuestionCard';
import PageLayout from '@layouts/page.layout';
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getCategories } from 'service/cateogry';
import { getQuestionByCategory, getQuestionWithAnswer } from 'service/question';
import { Answer, Question } from 'service/types';

interface Props {
	question: Question;
	answer: Answer;
	categories: string[];
}

export default function QuestionDetail({
	question,
	answer,
	categories,
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
				{question && (
					<QuestionCard question={question} answer={answer} />
				)}
			</Flex>
		</PageLayout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { category, question } = context.params!;
	const {
		question: questionFile,
		answer: answerFile,
	} = getQuestionWithAnswer(question as string, category as string);

	const questionFm = fm(questionFile);
	const answerFm = fm(answerFile);

	const categories = getCategories();

	return {
		props: {
			question: questionFm,
			answer: answerFm,
			categories,
		},
	};
};

// 获取路径，/[category]/question/[question]
export const getStaticPaths = () => {
	const categories = getCategories();
	const routes = categories?.map((category) => {
		const questions = getQuestionByCategory(category);
		const result: any[] = [];

		for (let index = 0; index < questions.length; index++) {
			result.push({
				params: {
					category,
					question: questions[index],
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
