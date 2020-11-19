import fm from 'front-matter';
import fs from 'fs';
import _ from 'lodash';
import {
	getFolderNameByRoute,
	getRouterNameByFolder,
} from 'service/category.config';
import { getQuestionsByCategory } from './question';
import { memoize, once } from './utils';

const basePath = process.env.BASE_PATH;

if (!basePath) {
	console.error('请设置basePath，例如："./content/"');
}

/**
 * 获取所有分类
 */
export const getCategories = _.once(_getCategories);

/**
 * 获取分类的index.mdx文件
 */
export const getCategoryIndex = memoize(_getCategoryIndex);

/**
 * 获取分类问题数量
 */
export const getCategoryQuestionsCount = memoize(_getCategoryQuestionsCount);

/**
 * 获取分类页面数量
 */
export const getCategoryTotalPages = memoize(_getCategoryTotalPages);

function _getCategoryTotalPages(category: string) {
	const questionPerPage = parseInt(process.env.QUESTION_PER_PAGE!);
	return Math.ceil(getCategoryQuestionsCount(category)) / questionPerPage;
}

function _getCategories() {
	const categories = fs.readdirSync(basePath!);
	categories.forEach((category) => getRouterNameByFolder(category));
	return categories;
}
function _getCategoryIndex(category: string) {
	const folder = getFolderNameByRoute(category);

	try {
		const file = fs.readFileSync(`./content/${folder}/index.mdx`, 'utf8');
		const fr = fm(file);
		return fr;
	} catch (err) {
		console.error(`${folder}目录下index.mdx文件缺失`);
	}
}
function _getCategoryQuestionsCount(category: string) {
	const folder = getQuestionsByCategory(category);
	return folder.length;
}
