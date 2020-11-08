import MDXRender from '@components/MDXRender';
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { getCategories } from 'service/cateogry';
import { getQuestionByCategory } from 'service/question';

const questionPerPage = parseInt(process.env.QUESTION_PER_PAGE!);

interface Props {
	questions: {
		attributes: { title: string };
		body: string;
	}[];
}

export default function Page({ questions }: Props): ReactElement {
	return (
		<>
			{questions &&
				questions.map((question) => (
					<div
						style={{ marginTop: '15px' }}
						key={question.attributes.title}
					>
						<MDXRender mdx={question.body} />
					</div>
				))}
		</>
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

	const questions = getQuestionByCategory(
		category as string,
		offset,
		questionPerPage,
		true
	);

	const result = questions.map((question) => {
		const foo = fm(question);
		return {
			attributes: foo.attributes,
			body: foo.body,
		};
	});

	return {
		props: {
			questions: result,
		},
	};
};

export const getStaticPaths = () => {
	// 每页展示的题目
	const categories = getCategories();
	const routes = categories?.map((category) => {
		const questions = getQuestionByCategory(category);
		const totalPages = Math.ceil(questions!.length / questionPerPage);
		const result = [];

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
