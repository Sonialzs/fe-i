const fs = require('fs');
const open = require('open');
const BASE_PATH = './content/';

const categories = getAllCategories();
const date = getCurrentDate();

module.exports = function (
	/** @type {import('plop').NodePlopAPI} */
	plop
) {
	plop.setWelcomeMessage('请选择要添加的文件');

	// plop generator code
	plop.setGenerator('question', {
		description: '添加一个问题',
		prompts: [
			{
				type: 'input',
				name: 'title',
				message: '请填写标题',
			},
			{
				type: 'list',
				name: 'category',
				message: '请选择问题分类',
				choices: categories,
				loop: false,
				default: categories.indexOf('JavaScript'),
			},
			{
				type: 'input',
				// BUG 如果命名为tags，会直接作为参数传到模板中，所以这里命名为tag
				name: 'tag',
				message: '请输入标签，以";"分隔',
			},
		],
		actions: (data) => {
			const tags = data.tag.split(';');
			const parameters = {
				title: data.title,
				date,
				tags,
				index: getCategoryIndex(data.category),
			};
			console.log(parameters);

			const actions = [
				{
					type: 'add',
					path: getPath(data.category, 'question.mdx', true),
					templateFile: './templates/question.hbs',
					data: parameters,
				},
				{
					type: 'add',
					path: getPath(data.category, 'answer.mdx', true),
					templateFile: './templates/answer.hbs',
					data: parameters,
				},
			];

			actions.push(function (data) {
				const f = open(getPath(data.category, 'question.mdx'), {
					// ⚠️仅支持vscode打开
					app: 'visual studio code',
				});
				if (data.withAnswer) {
					open(getPath(data.category, 'answer.mdx'), {
						// ⚠️仅支持vscode打开
						app: 'visual studio code',
					});
				}
				if (f) {
					return '已打开文件';
				} else {
					return '仅支持vscode自动打开文件';
				}
			});

			return actions;
		},
	});
};

function getAllCategories() {
	const categories = fs.readdirSync(BASE_PATH);
	return categories;
}

function getCategoryIndex(category) {
	const index = fs
		.readdirSync('./content/' + category, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
		.sort((a, b) => a - b)
		.slice(-1)
		.pop();
	return parseInt(index);
}

function getCurrentDate() {
	const date = new Date();
	const formatedDate = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;
	return formatedDate;
}

// 是否获取索引+1的路径
function getPath(category, fileName, increment = false) {
	const index = getCategoryIndex('JavaScript');
	return (
		BASE_PATH + `${category}/${increment ? index + 1 : index}/${fileName}`
	);
}
