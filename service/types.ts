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
	attributes: { title?: string; tags?: string[] };
	body?: string;
}
