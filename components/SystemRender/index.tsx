import { useDisclosure, Button, Collapse, Stack, Box } from '@chakra-ui/react';
import EditLink from '@components/EditLink';
import { MDXRenderAsync } from '@components/metrics/MDXRender/async';
import { css } from '@emotion/react';
import React, { ReactElement } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';

interface Props {
	mdx: string;
}

export default function SystemRender({ mdx }: Props): ReactElement {
	const { isOpen, onToggle } = useDisclosure();
	return (
		<>
			{!isOpen && (
				<Button onClick={onToggle} w="100%" color={'gray.500'}>
					<BsCaretDownFill />
				</Button>
			)}
			<Collapse in={isOpen} animateOpacity>
				<Box
					css={css`
						h2 {
							text-indent: 1em;
						}
						h3 {
							text-indent: 2em;
						}
						h4 {
							text-indent: 3em;
						}
						h5 {
							text-indent: 4em;
						}
					`}
				>
					<Stack spacing={8}>
						<MDXRenderAsync mdx={mdx} />
						<EditLink.System />
					</Stack>
				</Box>
			</Collapse>
		</>
	);
}
