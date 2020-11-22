import dynamic from 'next/dynamic';

const AnswerEditLinkAsync = dynamic(() => import('./AnswerEditLink'));
const QuestionEditLinkAsync = dynamic(() => import('./QuestionEditLink'));
const SystemEditLinkAsync = dynamic(() => import('./SystemEditLink'));

export default {
	Answer: AnswerEditLinkAsync,
	Question: QuestionEditLinkAsync,
	System: SystemEditLinkAsync,
};
