import {
	Badge,
	Box,
	Collapse,
	Divider,
	Flex,
	IconButton,
	PseudoBox,
} from '@chakra-ui/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { Answer, Question } from 'service/types';
import MDXRender from './MDXRender';

interface Props {
	question: Question;
	answer?: Answer;
	href?: string;
	key?: string;
}

export default function QuestionCard({
	question,
	answer,
	href,
	key,
	...props
}: Props): ReactElement {
	const [show, setShow] = React.useState(false);

	const handleToggle = () => setShow(!show);
	const finalUrl = href || question.attributes.sourceUrl || undefined;

	return (
		<>
			<PseudoBox
				borderWidth="1px"
				rounded="lg"
				width={['100%', '100%', '100%', '800px']}
				p={3}
				_hover={{ borderColor: '#fcdada' }}
				{...props}
			>
				<Flex direction={['column', 'column', 'row', 'row']}>
					{finalUrl ? (
						<Link href={finalUrl || '#'} key={key}>
							<a target="_blank">
								<Box cursor="pointer">
									<MDXRender mdx={question?.body} />
								</Box>
							</a>
						</Link>
					) : (
						<Box>
							<MDXRender mdx={question?.body} />
						</Box>
					)}

					<Box ml={[null, null, 'auto', 'auto']}>
						{question?.attributes?.tags?.map((tag) => (
							<Badge key={tag} mr="2" variantColor="red">
								{tag}
							</Badge>
						))}
					</Box>
				</Flex>
				{answer && (
					<>
						<Divider />
						<IconButton
							onClick={handleToggle}
							w="100%"
							size="sm"
							icon={show ? 'triangle-up' : 'triangle-down'}
							aria-label="Show Or Hide Answer"
							_focus={undefined}
						/>

						<Collapse mt={4} isOpen={show}>
							<MDXRender mdx={answer.body} />
						</Collapse>
					</>
				)}
			</PseudoBox>
		</>
	);
}
