import { Box, Button, Collapse } from '@chakra-ui/core';
import React, { ReactElement } from 'react';
import { Question } from 'service/types';
import MDXRender from './MDXRender';

interface Props {
	question: Question;
	answer?: string;
}

export default function QuestionCard({
	question,
	answer,
	...props
}: Props & React.HTMLAttributes<HTMLDivElement>): ReactElement {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);

	return (
		<Box
			borderWidth="1px"
			rounded="lg"
			width={['300px', '500px', '700px', '800px']}
			p={4}
			as="section"
			{...props}
		>
			<Box>
				<MDXRender mdx={question.body} />
			</Box>
			<Collapse startingHeight={0} isOpen={show}>
				Anim pariatur cliche reprehenderit, enim eiusmod high life
				accusamus terry richardson ad squid. Nihil anim keffiyeh
				helvetica, craft beer labore wes anderson cred nesciunt sapiente
				ea proident.
			</Collapse>
			<Button size="sm" onClick={handleToggle} mt="1rem">
				Show {show ? 'Less' : 'More'}
			</Button>
		</Box>
	);
}
