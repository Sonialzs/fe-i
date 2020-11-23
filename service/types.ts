export interface QuestionType {
	attributes: {
		title: string;
		tags?: string[];
		source?: string;
		slug: string;
		index: number;
		date: string;
	};
	body: string;
}

export interface AnswerType {
	attributes: {
		category: string;
		index: string;
		title: string;
		tags?: string[];
		authors: string[];
		authorsUrl: string[];
	};
	body: string;
}

export interface BlogType {
	attributes: {
		title: string;
		summary: string;
		tags?: string[];
		slug: string;
		date: string;
		draft: boolean;
		authors: string[];
		authorsUrl: string[];
		readingTime?: ReadingTime;
	};
	body: string;
}

export interface WTFType {
	attributes: {
		title: string;
		summary?: string;
		index: number;
		tags?: string[];
		slug: string;
		date: string;
		draft: boolean;
		authors: string[];
		authorsUrl: string[];
		readingTime?: ReadingTime;
	};
	body: string;
}

interface ReadingTime {
	text: string;
	minutes: number;
	time: number;
	words: number;
}
