import { Box, Collapse, Divider, Flex, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { Answer, Question } from 'service/types';
import { MDXRenderAsync } from './MDXRender/async';
import { TagsAsync } from './Tags/async';
import { ViewCounterAsync } from './ViewCounter/async';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

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
	const finalUrl = href || question.attributes.source || undefined;

	return (
		<>
			<Box
				borderWidth="1px"
				rounded="lg"
				width={['100%', '100%', '100%', '800px']}
				p={3}
				_hover={{ borderColor: '#EDF2F7' }}
				{...props}
			>
				<Flex direction={['column', 'column', 'row', 'row']}>
					<Box mr={[null, null, 4, 4]}>
						{finalUrl ? (
							<Link href={finalUrl || '#'} key={key}>
								<a target="_blank">
									<Box cursor="pointer">
										<MDXRenderAsync mdx={question?.body} />
									</Box>
								</a>
							</Link>
						) : (
							<Box>
								<MDXRenderAsync mdx={question?.body} />
							</Box>
						)}
					</Box>

					<Box mt="0.3em" ml={[null, null, 'auto', 'auto']}>
						{question?.attributes?.tags && (
							<TagsAsync tags={question?.attributes?.tags} />
						)}
						<ViewCounterAsync slug={question.attributes.slug} />
					</Box>
				</Flex>
				{answer && (
					<>
						<Divider />
						<IconButton
							onClick={handleToggle}
							w="100%"
							size="sm"
							icon={
								show ? <AiFillCaretUp /> : <AiFillCaretDown />
							}
							aria-label="Show Or Hide Answer"
							_focus={undefined}
						/>

						<Collapse in={show}>
							<Box mt="4">
								<MDXRenderAsync mdx={answer.body} />
							</Box>
						</Collapse>
					</>
				)}
			</Box>
		</>
	);
}
