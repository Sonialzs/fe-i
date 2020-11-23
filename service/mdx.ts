const readingTime = require('reading-time');

export function getWordCount(mdxContent) {
	return mdxContent.split(/\s+/gu).length;
}

export function getReadingTime(mdxContent) {
	return readingTime(mdxContent);
}
