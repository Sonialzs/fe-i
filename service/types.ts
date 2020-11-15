export interface Question {
	attributes: {
		title: string;
		tags?: string[];
		source?: string;
		slug: string;
		index: number;
		date: string;
	};
	body?: string;
}

export interface Answer {
	attributes: {
		title?: string;
		tags?: string[];
		authors?: string[];
		authorsLink?: string[];
	};
	body?: string;
}

export interface Blog {
	attributes: {
		title: string;
		tags?: string[];
		slug: string;
		publishAt: string;
		updatedAt: string;
		draft: boolean;
	};
	body?: string;
}
