import { Box, Collapse, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import { AuthorsAsync } from '@components/Authors/async';
import { MDXRenderAsync } from '@components/MDXRender/async';
import React, { ReactElement } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { GoLinkExternal } from 'react-icons/go';
import { Answer } from 'service/types';

interface Props {
	answer?: Answer;
}

export default function AnswerRender({ answer }: Props): ReactElement {
	const [show, setShow] = React.useState(false);

	const handleToggle = () => setShow(!show);

	return (
		<Box mt={'2em'}>
			{answer ? (
				<>
					<IconButton
						onClick={handleToggle}
						w="100%"
						size="sm"
						icon={show ? <AiFillCaretUp /> : <AiFillCaretDown />}
						aria-label="Show Or Hide Answer"
						_focus={undefined}
					/>

					<Collapse in={show}>
						<Stack mt="4" spacing="8" mx={1}>
							<AuthorsAsync
								authors={answer.attributes.authors}
								authorsUrl={answer.attributes.authorsUrl}
								category={answer.attributes.category}
								index={answer.attributes.index}
							/>
							<MDXRenderAsync mdx={answer?.body} />
						</Stack>
					</Collapse>
				</>
			) : (
				<Text fontSize="sm" color="gray.500">
					尚无解答，
					<Link color="red.300" href="#" isExternal>
						提交你的解答{' '}
						<Box display="inline-block" verticalAlign="text-bottom">
							<GoLinkExternal />
						</Box>
					</Link>
				</Text>
			)}
		</Box>
	);
}
