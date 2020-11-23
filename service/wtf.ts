import { memoize } from './utils';
import fs from 'fs';
import fm, { FrontMatterResult } from 'front-matter';

const basePath = process.env.BASE_PATH;

export const getWTFByCategory = memoize(_getWTFbyCategory);

export const getWTFByFileName = memoize(_getWTFByFileName);

function _getWTFbyCategory(categoryFolder: string) {
	const path = basePath + categoryFolder + '/wtf';
	const files = fs
		.readdirSync(path)
		.map((fileName) => getWTFByFileName(categoryFolder, fileName))
		.filter((fm) => !fm?.attributes.draft)
		.sort((a, b) => a?.attributes.index - b?.attributes.index);
	return files;
}

function _getWTFByFileName(
	categoryFolder: string,
	fileName: string
): FrontMatterResult<any> | null {
	if (!fileName.endsWith('.mdx')) {
		fileName = fileName + '.mdx';
	}
	const path = basePath + categoryFolder + '/wtf/' + fileName;

	const raw = fs.readFileSync(path, 'utf8');
	return fm(raw);
}
