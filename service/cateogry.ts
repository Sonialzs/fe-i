import fm from 'front-matter';
import fs from 'fs';
import { getFolderNameByRoute } from '@utils/category.config';

// 获取所有分类
export function getCategories() {
	const categories = fs.readdirSync('./content/');
	categories.forEach((category) => category.toLowerCase());
	return categories;
}

// 获取分类的index.mdx文件
export function getCategoryIndex(category: string) {
	try {
		const folder = getFolderNameByRoute(category);
		const file = fs.readFileSync(`./content/${folder}/index.mdx`, 'utf8');
		const fr = fm(file);
		return fr;
	} catch (err) {
		console.error(`${category}目录下index.mdx文件缺失`);
	}
}
