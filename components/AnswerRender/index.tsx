import { Box, Collapse, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import { AuthorsAsync } from '@components/AuthorsRender/async';
import { MDXRenderAsync } from '@components/metrics/MDXRender/async';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { GoLinkExternal } from 'react-icons/go';
import { getFolderNameByRoute } from 'service/category.config';
import { AnswerType } from 'service/types';

interface Props {
	answer?: AnswerType;
}

export default function AnswerRender({ answer }: Props): ReactElement {
	const [show, setShow] = useState(false);

	const handleToggle = () => setShow(!show);

	const query = useRouter().query;

	const getEditUrl = () => {
		const category = getFolderNameByRoute(query.category as string);
		const index = query.question;
		return `https://github.com/Xwil/fe-i/edit/master/content/${category}/${index}/answer.mdx`;
	};

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
							/>
							<MDXRenderAsync mdx={answer?.body} />
						</Stack>
					</Collapse>
				</>
			) : (
				<Text fontSize="sm" color="gray.500">
					尚无解答，
					<Link color="red.300" href={getEditUrl()} isExternal>
						提交你的解答 <GoLinkExternal />
					</Link>
				</Text>
			)}
		</Box>
	);
}
