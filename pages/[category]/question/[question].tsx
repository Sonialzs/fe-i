import { Flex } from '@chakra-ui/core';
import QuestionCard from '@components/QuestionCard';
import QuestionSEO from '@components/QuestionSEO';
import PageLayout from '@layouts/page.layout';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import CategoriesConfig from 'service/category.config';
import { getFoldersByCategory, getQuestionAndAnswer } from 'service/question';
import { Answer, Question } from 'service/types';

interface Props {
	question: Question;
	answer: Answer;
}

export default function QuestionDetail({
	question,
	answer,
}: Props): ReactElement {
	const router = useRouter();

	return (
		<PageLayout>
			<QuestionSEO
				title={question.attributes.title}
				date={question.attributes.date}
				url={router.asPath}
			/>
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

	const result = getQuestionAndAnswer(category as string, question as string);

	return {
		props: {
			...result,
		},
	};
};

// 获取路径，/[category]/question/[question]
export const getStaticPaths = () => {
	const routes = CategoriesConfig.available.map((category) => {
		const questions = getFoldersByCategory(category.routeName);
		const result: any[] = [];

		for (let index = 0; index < questions.length; index++) {
			result.push({
				params: {
					category: category.routeName,
					question: questions[index].toString(),
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
