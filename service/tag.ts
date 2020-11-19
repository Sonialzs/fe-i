// ! 待优化
import { getFolderNameByRoute } from './category.config';
import {
	getQuestion,
	getQuestionsByCategory,
	getQuestionsInCategoryByTag,
} from './question';
import { memoize } from './utils';
import fs from 'fs';
import _ from 'lodash';

interface TagRelationType {
	title: string;
	childs: string[];
	routeName: string;
}

export interface TagConfigType extends TagRelationType {
	questions?: number[];
}

export function buildTagConfig(category: string) {
	generateTagConfig(category);
	return getTagConfig(category);
}

export function getTagConfig(category: string): TagConfigType[] | undefined {
	const path =
		process.env.BASE_PATH + getFolderNameByRoute(category) + '/tags.json';
	if (fs.existsSync(path)) {
		return JSON.parse(fs.readFileSync(path, 'utf8'));
	}
}

const generateTagConfig = memoize(_generateTagConfig);

const getTagRelation = memoize(_getTagRelation);

function _generateTagConfig(category: string) {
	const questions = getQuestionsByCategory(category, 0, 0, true);

	const tagsSet: Set<string> = new Set();

	const tags = questions
		.map((question) => getQuestion(category, question)?.attributes.tags)
		.flat();

	if (tags.length == 0) {
		return [];
	}

	tags.forEach((tag) => tagsSet.add(tag));

	const result = Array.from(tagsSet);

	_organizeTags(category, result);

	return result;
}

/**
 * 根据配置生成标签的具体信息
 * @param category 分类
 * @param tags 所有标签
 */
function _organizeTags(category: string, tags: string[]) {
	// 未设置标签关系的标签
	const unsetTags = tags;
	const relations = getTagRelation(category);
	const result: any[] = [];

	relations.forEach((relation) => {
		const allQuestions: Set<number> = new Set();

		relation.childs.forEach((tag) => {
			// 从unsetTags中移除
			_.remove(unsetTags, (value) => value === tag);

			const childTagQuestions = getQuestionsInCategoryByTag(
				category,
				tag
			);
			childTagQuestions.forEach((question) => allQuestions.add(question));
		});

		result.push({
			...relation,
			questions: Array.from(allQuestions),
		});
	});

	const categoryPath = process.env.BASE_PATH + getFolderNameByRoute(category);

	// 生成配置文件
	fs.writeFileSync(categoryPath + '/tags.json', JSON.stringify(result));

	if (unsetTags.length > 0) {
		fs.writeFileSync(
			categoryPath + '/tag.unset.json',
			JSON.stringify(unsetTags)
		);
	} else {
		const path = categoryPath + '/tags.unset.json';

		fs.existsSync(path) && fs.unlinkSync(path);
	}
}

/**
 * 获取分类下的标签关系配置
 * @param category 分类
 */
function _getTagRelation(category: string) {
	const folderName = getFolderNameByRoute(category);
	const relationFilePath = `${process.env.BASE_PATH}${folderName}/tags.relation.json`;
	const relationFile = fs.readFileSync(relationFilePath, 'utf8');
	const relation: TagRelationType[] = JSON.parse(relationFile);

	return relation;
}
