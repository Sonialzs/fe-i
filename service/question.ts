import { FrontMatterResult } from 'front-matter';
import fs from 'fs';
import { getFolderNameByRoute } from 'service/category.config';
import { buildPath, getMDXByPath, isDraft } from './utils';

const basePath = process.env.BASE_PATH;

/**
 * 获取某个分类下的所有文件夹
 * @param category 分类的*路由*名称
 * @returns 排序后的文件夹名
 */
export function getFoldersByCategory(
	category: string,
	draftOnly = true
): number[] {
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

/**
 * 查询分类中的文件夹，支持分页，检查draft状态
 * @param category 分类的*路由*名称
 * @param offset 开始的索引
 * @param limit 数量限制
 * @returns 筛选排序后的文件夹名
 */
export function getQuestionsByCategory(
	category: string,
	offset = 0,
	limit = 0,
	draftOnly = true
): number[] {
	const folders = getFoldersByCategory(category, draftOnly);
	if (limit) {
		return folders.slice(offset, offset + limit);
	}

	return folders;
}

/**
 * 根据文件夹名称获取问题
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 * @param draftOnly 是否只查询草稿
 * @returns frontmatter解析后的文件
 */
export function getQuestion(
	category: string,
	questionFolder: number | string,
	draftOnly = true
): FrontMatterResult<any> | null {
	const path = buildPath(category, questionFolder) + '/question.mdx';
	return getMDXByPath(path, draftOnly);
}

/**
 * 根据文件夹名称获取答案
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 * @param draftOnly 是否只查询草稿
 * @returns frontmatter解析后的文件
 */
export function getAnswer(
	category: string,
	questionFolder: number | string,
	draftOnly = true
): FrontMatterResult<any> | null {
	const path = buildPath(category, questionFolder) + '/answer.mdx';
	return getMDXByPath(path, draftOnly);
}

/**
 * 根据文件夹名称获取问题和答案
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 * @param draftOnly 是否只查询草稿
 * @returns frontmatter解析后的文件
 */
export function getQuestionAndAnswer(
	category,
	questionFolder,
	draftOnly = true
) {
	const question = getQuestion(category, questionFolder, draftOnly);
	const answer = getAnswer(category, questionFolder, draftOnly);
	return {
		question,
		answer,
	};
}
