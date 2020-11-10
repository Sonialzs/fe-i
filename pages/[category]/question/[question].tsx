import { Flex } from '@chakra-ui/core';
import QuestionCard from '@components/QuestionCard';
import PageLayout from '@layouts/page.layout';
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getQuestionByCategory, getQuestionWithAnswer } from 'service/question';
import { Answer, Question } from 'service/types';
import CategoriesConfig from 'site.config';
import categories from 'site.config';

interface Props {
	question: Question;
	answer: Answer;
}

export default function QuestionDetail({
	question,
	answer,
}: Props): ReactElement {
	return (
		<PageLayout>
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

	return {
		props: {
			question: questionFm,
			answer: answerFm,
		},
	};
};

// 获取路径，/[category]/question/[question]
export const getStaticPaths = () => {
	const routes = CategoriesConfig.available.map((category) => {
		const questions = getQuestionByCategory(category.folder);
		const result: any[] = [];

		for (let index = 0; index < questions.length; index++) {
			result.push({
				params: {
					category: category.routeName,
					question: questions[index],
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
