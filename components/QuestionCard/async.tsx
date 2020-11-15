import dynamic from 'next/dynamic';

export const QuestionCardAsync = dynamic(() => import('./'));
