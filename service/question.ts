import fm, { FrontMatterResult } from 'front-matter';
import fs from 'fs';

import { getFolderNameByRoute } from 'service/category.config';
import { buildPath, getMDXByPath, isDraft, memoize } from './utils';

const basePath = process.env.BASE_PATH;

/**
 * 获取某个分类下的所有文件夹
 * @param category 分类的*路由*名称
 * @returns 排序后的文件夹名
 */
export const getFoldersByCategory = memoize(_getFoldersByCategory);

/**
 * 查询分类中的文件夹，支持分页，检查draft状态
 * @param category 分类的*路由*名称
 * @param offset 开始的索引
 * @param limit 数量限制
 * @param reverse 是否翻转数组
 * @returns 筛选排序后的文件夹名
 */
export const getQuestionsByCategory = memoize(_getQuestionsByCategory);

/**
 * 获取分类中包含该标签的所有问题文件夹
 * @param category 分类
 * @param tag 标签
 * @returns 包含该标签的问题文件夹
 */
export const getQuestionsInCategoryByTag = memoize(
	_getQuestionsInCategoryByTag
);

/**
 * 根据文件夹名称获取问题
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 * @param draftOnly 是否只查询草稿
 * @returns frontmatter解析后的文件
 */
export const getQuestion = memoize(_getQuestion);

/**
 * 根据文件夹名称获取答案
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 * @param draftOnly 是否只查询草稿
 * @returns frontmatter解析后的文件
 */
export const getAnswer = memoize(_getAnswer);

/**
 * 根据文件夹名称获取问题和答案
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 * @param draftOnly 是否只查询草稿
 * @returns frontmatter解析后的文件
 */
export const getQuestionAndAnswer = memoize(_getQuestionAndAnswer);

function _getFoldersByCategory(category: string, draftOnly = true): number[] {
	// 根据配置将路由名转换为文件名
	const categoryFolder = getFolderNameByRoute(category);

	const path = basePath + categoryFolder;

	const folders = fs
		// 筛选出文件夹，忽略index.mdx
		.readdirSync(path, {
			withFileTypes: true,
		})
		.filter((dirent) => dirent.isDirectory())
		// 获取文件夹名称
		.map((dirent) => parseInt(dirent.name))
		// 排序
		.sort((a, b) => a - b);
	if (draftOnly) {
		return folders.filter(
			(folder) => !isDraft(buildPath(categoryFolder, folder))
		);
	}
	return folders;
}

function _getQuestion(
	category: string,
	questionFolder: number | string,
	draftOnly = true
): FrontMatterResult<any> | null {
	const path = buildPath(category, questionFolder) + '/question.mdx';
	return getMDXByPath(path, draftOnly);
}

function _getAnswer(
	category: string,
	questionFolder: number | string,
	draftOnly = true
): FrontMatterResult<any> | null {
	const path = buildPath(category, questionFolder) + '/answer.mdx';
	return getMDXByPath(path, draftOnly);
}

function _getQuestionsByCategory(
	category: string,
	offset = 0,
	limit = 0,
	draftOnly = true,
	reverse = false
): number[] {
	let folders = getFoldersByCategory(category, draftOnly);
	if (reverse) {
		folders = folders.reverse();
	}
	if (limit) {
		return folders.slice(offset, offset + limit);
	}

	return folders;
}

function _getQuestionsInCategoryByTag(category: string, tag: string) {
	const questions = getQuestionsByCategory(category);
	return questions.filter((question) =>
		getQuestion(category, question)?.attributes.tags.includes(tag)
	);
}

function _getQuestionAndAnswer(category, questionFolder, draftOnly = true) {
	const question = getQuestion(category, questionFolder, draftOnly);
	const answer = getAnswer(category, questionFolder, draftOnly);
	return {
		question,
		answer,
	};
}
