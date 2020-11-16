export interface Question {
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

export interface Answer {
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

export interface Blog {
	attributes: {
		title: string;
		summary: string;
		tags?: string[];
		slug: string;
		publishAt: string;
		updatedAt: string;
		draft: boolean;
	};
	body: string;
}
