import { Badge } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export interface Tag {
	title: string;
	url?: string;
}

interface Props {
	tags?: string[];
}

export default function Tags({ tags }: Props): ReactElement {
	return (
		<>
			{tags?.map((tag) => (
				<Badge key={tag} mr="2" variantColor="red">
					{tag}
				</Badge>
			))}
		</>
	);
}
