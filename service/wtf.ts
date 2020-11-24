import fm from 'front-matter';
import fs from 'fs';
import { WTFType } from './types';
import { memoize } from './utils';

const basePath = process.env.BASE_PATH;

export const getWTFByCategory = memoize(_getWTFbyCategory);

export const getWTFByFileName = memoize(_getWTFByFileName);

function _getWTFbyCategory(categoryFolder: string) {
	const path = basePath + categoryFolder + '/wtf';
	if (!fs.existsSync(path)) {
		return [];
	}
	const files = fs
		.readdirSync(path)
		.map((fileName) => getWTFByFileName(categoryFolder, fileName))
		.filter((fm) => !fm!.attributes.draft)
		.sort((a, b) => a!.attributes.index - b!.attributes.index);
	return files;
}

function _getWTFByFileName(
	categoryFolder: string,
	fileName: string
): WTFType | null {
	if (!fileName.endsWith('.mdx')) {
		fileName = fileName + '.mdx';
	}
	const path = basePath + categoryFolder + '/wtf/' + fileName;

	const raw = fs.readFileSync(path, 'utf8');
	return fm(raw);
}
