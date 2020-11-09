import fs from 'fs';

// 根据分类获取所有题目
export function getQuestionByCategory(
	category: string,
	offset = 0,
	limit = 0,
	withTitleDetail = false
) {
	const questions = fs
		.readdirSync('./content/' + category, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
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
	const questionFile = fs.readFileSync(
		`./content/${category}/${question}/question.mdx`,
		'utf8'
	);
	return questionFile;
}

// 根据题目获取答案
export function getQuestionAnswer(question: string, category: string) {
	const answerFile = fs.readFileSync(
		`./content/${category}/${question}/answer.mdx`,
		'utf8'
	);
	return answerFile;
}

// 根据题目获取完整题目和答案
export function getQuestionWithAnswer(question: string, category: string) {
	const questionFile = getQuestionTitle(question, category);
	const answerFile = getQuestionAnswer(question, category);
	return { question: questionFile, answer: answerFile };
}
