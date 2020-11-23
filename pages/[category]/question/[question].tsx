import { Box, Flex } from '@chakra-ui/react';
import { AnswerRenderAsync } from '@components/AnswerRender/async';
import EditLink from '@components/EditLink';
import { MDXRenderAsync } from '@components/metrics/MDXRender/async';
import QuestionSEO from '@components/SEO/QuestionSEO';
import { TagsAsync } from '@components/TagsRender/async';
import { ViewCounterAsync } from '@components/ViewCounter/async';
import PageLayout from '@layouts/page';
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
				url={process.env.SITE_URL + router.asPath}
			/>
			<Flex
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				maxWidth="900px"
				mx="auto"
			>
				<Box as="article" width={['20em', '30em', '40em', '50em']}>
					<MDXRenderAsync mdx={question.body} />

					<Flex mt={'1em'} justify={'space-between'}>
						<Flex fontSize="xs" color="gray.500">
							{question.attributes.date} /
							<ViewCounterAsync
								fontSize="xs"
								ml="0.5em"
								slug={question.attributes.slug}
							/>
							<EditLink.Question ml={4} />
						</Flex>
						<Box>
							<TagsAsync tags={question.attributes.tags} />
						</Box>
					</Flex>
					<AnswerRenderAsync answer={answer} />
				</Box>
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
