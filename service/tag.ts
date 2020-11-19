import { getQuestionsByCategory } from './question';

export function getAllTagsByCategory(category: string) {
	const questions = getQuestionsByCategory(category, 0, 0, true);

	console.log(questions);
}
