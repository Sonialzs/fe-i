import fs from 'fs';
import { getFolderNameByRoute } from '@utils/category.config';
import fm from 'front-matter';

// 根据分类获取所有题目
export function getQuestionByCategory(
	category: string,
	offset = 0,
	limit = 0,
	withTitleDetail = false
) {
	const categoryFolder = getFolderNameByRoute(category);

	// 筛选出需要渲染的文件夹
	const questions = fs
		.readdirSync('./content/' + categoryFolder, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
		.filter((folder) => isValidQuestion(categoryFolder, folder));
	// 根据标题排序
	questions.sort((a, b) => parseInt(a) - parseInt(b));
	let result = questions;

	if (offset !== 0 || limit !== 0) {
		result = questions.slice(offset, offset + limit);
	}

	if (withTitleDetail) {
		return result.map((question) => getQuestionTitle(question, category));
	} else {
		return result;
	}
}

// 根据题目获取完整题目
export function getQuestionTitle(question: string, category: string) {
	const categoryFolder = getFolderNameByRoute(category);
	const questionFile = fs.readFileSync(
		`./content/${categoryFolder}/${question}/question.mdx`,
		'utf8'
	);
	return questionFile;
}

// 根据题目获取答案
export function getQuestionAnswer(question: string, category: string) {
	const categoryFolder = getFolderNameByRoute(category);
	const answerFile = fs.readFileSync(
		`./content/${categoryFolder}/${question}/answer.mdx`,
		'utf8'
	);
	// @ts-ignore
	if (fm(answerFile).attributes.draft == false) {
		return answerFile;
	}
}

// 根据题目获取完整题目和答案
export function getQuestionWithAnswer(question: string, category: string) {
	const questionFile = getQuestionTitle(question, category);
	const answerFile = getQuestionAnswer(question, category);
	return { question: questionFile, answer: answerFile };
}

export function isValidQuestion(category, folder) {
	const path = `./content/${category}/${folder}/question.mdx`;
	const file = fs.readFileSync(path, 'utf8');
	const matter = fm(file);

	// @ts-ignore
	return !matter.attributes.draft;
}
