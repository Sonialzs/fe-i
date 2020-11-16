import {
	IconBrowser,
	IconCSS,
	IconHTML,
	IconHTTP,
	IconJavaScript,
	IconNode,
	IconReact,
	IconTypescript,
	IconVue,
	IconWebpack,
} from '@components/Icons';

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
		icon: IconHTML,
	},
	{
		title: 'CSS',
		folder: 'CSS',
		routeName: 'css',
		icon: IconCSS,
	},
	{
		title: 'JavaScript',
		folder: 'JavaScript',
		routeName: 'js',
		available: true,
		icon: IconJavaScript,
	},
	{
		title: 'TypeScript',
		folder: 'TypeScript',
		routeName: 'ts',
		icon: IconTypescript,
	},
	{
		title: 'Node.js',
		folder: 'node',
		routeName: 'node',
		icon: IconNode,
	},
	{
		title: 'React',
		folder: 'React',
		routeName: 'react',
		icon: IconReact,
	},
	{
		title: 'Vue',
		folder: 'Vue',
		routeName: 'vue',
		icon: IconVue,
	},
	{
		title: 'Webpack',
		folder: 'Webpack',
		routeName: 'webpack',
		icon: IconWebpack,
	},
	{
		title: '网络',
		folder: 'Network',
		routeName: 'network',
		icon: IconHTTP,
	},
	{
		title: '浏览器',
		folder: 'Browser',
		routeName: 'browser',
		icon: IconBrowser,
	},
	{
		title: '其他',
		folder: 'Others',
		routeName: 'others',
		hide: true,
	},
];

// 根据路由名称获取文件夹名
export function getFolderNameByRoute(routeName: string) {
	let result = routeName;
	const cateogry = allCategories.filter(
		(category) => category.routeName == routeName
	);
	if (cateogry[0]) {
		result = cateogry[0].folder;
	}
	return result;
}

// 根据文件夹名获取路由名
export function getRouterNameByFolder(folder: string) {
	let result = folder;
	const cateogry = allCategories.filter(
		(category) => category.folder == folder
	);
	if (cateogry[0]) {
		result = cateogry[0].routeName;
	}
	return result;
}

export function getAvailableCategories() {
	return allCategories.filter((category) => category.available === true);
}

export function getAllTitles() {
	return allCategories.map((category) => category.title);
}

const CategoriesConfig = {
	all: allCategories,
	available: getAvailableCategories(),
	titles: getAllTitles(),
};

export default CategoriesConfig;
