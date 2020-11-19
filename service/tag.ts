import { getFolderNameByRoute } from './category.config';
import {
	getQuestion,
	getQuestionsByCategory,
	getQuestionsInCategoryByTag,
} from './question';
import { memoize } from './utils';
import fs from 'fs';
import _ from 'lodash';

export const getAllTagsByCategory = memoize(_getAllTagsByCategory);

interface TagsType {
	title: string;
	total: number;
	folders: number[];
	parent: TagsType;
	childs: TagsType[];
}

interface TagRelationType {
	title: string;
	childs: string[];
	routeName: string;
}

function _getAllTagsByCategory(category: string) {
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

	generateTagsList(category, result);
	organizeTags(category, result);

	return result;
}

/**
 * 根据配置生成标签的具体信息
 * @param category 分类
 * @param tags 所有标签
 */
function organizeTags(category: string, tags: string[]) {
	// 未设置标签关系的标签
	const unsetTags = tags;
	const relations = getTagRelation(category);
	const result: any[] = [];

	relations.forEach((relation) => {
		const ques: number[] = [];

		relation.childs.forEach((tag) => {
			// 从unsetTags中移除
			_.remove(unsetTags, (value) => value === tag);

			const questions = getQuestionsInCategoryByTag(category, tag);
			ques.push(...questions);
		});

		result.push({
			...relation,
			total: ques.length,
			questions: ques,
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

const getTagRelation = memoize(_getTagRelation);
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
