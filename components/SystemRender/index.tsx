import { useDisclosure, Button, Collapse, Stack } from '@chakra-ui/react';
import EditLink from '@components/EditLink';
import { MDXRenderAsync } from '@components/metrics/MDXRender/async';
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
				<Stack spacing={8}>
					<MDXRenderAsync mdx={mdx} />
					<EditLink.System />
				</Stack>
			</Collapse>
		</>
	);
}
