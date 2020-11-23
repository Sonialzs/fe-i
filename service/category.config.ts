import _ from 'lodash';
import { memoize } from './utils';

export interface CategoryType {
	// 显示的名称
	title: string;
	// 文件夹
	folder: string;
	// 作为路由时的名称
	routeName: string;
	// 是否在导航栏中隐藏
	hide?: boolean;
	// 是否渲染路由
	available?: boolean;
	icon?;
}

// 由于文件夹中文名和排序问题，使用配置文件生成nav
const allCategories: CategoryType[] = [
	{
		title: 'HTML',
		folder: 'HTML',
		routeName: 'html',
	},
	{
		title: 'CSS',
		folder: 'CSS',
		routeName: 'css',
	},
	{
		title: 'JavaScript',
		folder: 'JavaScript',
		routeName: 'js',
		available: true,
	},
	{
		title: 'TypeScript',
		folder: 'TypeScript',
		routeName: 'ts',
	},
	{
		title: 'Node.js',
		folder: 'Node',
		routeName: 'node',
	},
	{
		title: 'React',
		folder: 'React',
		routeName: 'react',
	},
	{
		title: 'Vue',
		folder: 'Vue',
		routeName: 'vue',
	},
	{
		title: 'Webpack',
		folder: 'Webpack',
		routeName: 'webpack',
	},
	{
		title: '网络',
		folder: 'Network',
		routeName: 'network',
	},
	{
		title: '浏览器',
		folder: 'Browser',
		routeName: 'browser',
	},
	{
		title: '其他',
		folder: 'Others',
		routeName: 'others',
		hide: true,
	},
];

/**
 * 根据路由名称获取文件夹名
 * @param routeName 从路由中获取的分类名
 */
export const getFolderNameByRoute = memoize(_getFolderNameByRoute);

/**
 * 根据路由名称获取Icon
 * @param routeName 从路由中获取的分类名
 */
export const getIconByRoute = memoize(_getIconByRoute);

/**
 * 根据文件夹名获取路由名
 * @param folder 文件夹名称
 */
export const getRouterNameByFolder = memoize(_getRouterNameByFolder);

/**
 * 获取状态为availabel的所有分类对象
 */
export const getAvailableCategories = memoize(_getAvailableCategories);

/**
 * 获取所有分类对象的标题，忽略状态
 */
export const getAllTitles = memoize(_getAllTitles);

const CategoriesConfig = {
	all: allCategories,
	available: getAvailableCategories(),
	titles: getAllTitles(),
	getFolderNameByRoute,
};

export default CategoriesConfig;

function _getAllTitles() {
	return allCategories.map((category) => category.title);
}

function _getAvailableCategories() {
	return allCategories.filter((category) => category.available === true);
}

function _getRouterNameByFolder(folder: string) {
	let result = folder;
	const cateogry = allCategories.filter(
		(category) => category.folder == folder
	);
	if (cateogry[0]) {
		result = cateogry[0].routeName;
	}
	return result;
}

function _getIconByRoute(routeName: string) {
	const category = getAvailableCategories().filter(
		(config) => config.routeName === routeName
	)[0];
	return category.icon || null;
}

function _getFolderNameByRoute(routeName: string) {
	let result = routeName;
	const cateogry = allCategories.filter(
		(category) => category.routeName == routeName
	);
	if (cateogry[0]) {
		result = cateogry[0].folder;
	}
	return result;
}
