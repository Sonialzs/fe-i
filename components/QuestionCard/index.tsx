import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { Question } from 'service/types';
import { MDXRenderAsync } from '../MDXRender/async';
import { TagsAsync } from '../TagsRender/async';

interface Props {
	question: Question;
	href?: string;
}

export default function QuestionCard({
	question,
	href,
	...props
}: Props): ReactElement {
	const finalUrl = href || question.attributes.source || undefined;

	return (
		<>
			<Box
				borderWidth="1px"
				rounded="lg"
				width={['20em', '25em', '32em', '50em']}
				p={3}
				_hover={{ borderColor: '#EDF2F7' }}
				{...props}
			>
				<Flex direction={['column', 'column', 'row', 'row']}>
					<Box mr={[null, null, 4, 4]}>
						{finalUrl ? (
							<Link href={finalUrl || '#'}>
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
					</Box>
				</Flex>
			</Box>
		</>
	);
}
