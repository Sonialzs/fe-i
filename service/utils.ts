import { getFolderNameByRoute } from 'service/category.config';
import fm from 'front-matter';
import fs from 'fs';
import _once from 'lodash/once';
import _memoize from 'lodash/memoize';
const basePath = process.env.BASE_PATH;

/**
 * 根据分类和文件夹构建路径
 * @param category 分类的*路由*名称
 * @param questionFolder 文件夹名称
 */
export function buildPath(category, questionFolder) {
	const categoryFolder = getFolderNameByRoute(category);
	const path = basePath + categoryFolder + '/' + questionFolder;
	return path;
}

/**
 * 检查mdx文件是否为草稿
 * @param path mdx文件的完整路径
 */
export function isDraft(path: string) {
	if (!path.endsWith('.mdx')) {
		path = path + '/question.mdx';
	}
	// @ts-ignore
	return fm(loadFile(path)).attributes.draft;
}

/**
 * 根据路径获取MDX文件
 * @param path 完整路径
 * @param draftOnly 是否只返回非草稿文件
 */
export function getMDXByPath(path: string, draftOnly = true) {
	const result = fm(loadFile(path));
	if (draftOnly === isDraft(path)) {
		return null;
	}
	return result;
}

function loadFile(path: string) {
	return fs.readFileSync(path, 'utf8');
}

/**
 * 解决lodash memoize只将第一个参数作为cache key的bug，这里将所有参数+起来当做cache key
 * @param args
 */
function memoizeResolver(...args) {
	let cacheKey;
	args.forEach((arg) => (cacheKey = cacheKey + arg));
	return cacheKey;
}

export function memoize<T extends (...args: any) => any>(func: T) {
	// 开发环境不用memoize，会导致内容不更新的问题
	if (process.env.NODE_ENV === 'development') {
		return func;
	} else {
		return _memoize(func, memoizeResolver);
	}
}

export function once(func) {
	if (process.env.NODE_ENV === 'development') {
		return func;
	} else {
		return _once(func);
	}
}
