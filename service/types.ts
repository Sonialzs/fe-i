export interface Question {
	attributes: {
		title: string;
		tags?: string[];
		source?: string;
		slug: string;
		index: number;
	};
	body?: string;
}

export interface Answer {
	attributes: { title?: string; tags?: string[] };
	body?: string;
}
