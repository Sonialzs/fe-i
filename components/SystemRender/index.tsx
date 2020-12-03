import { Box, Stack } from '@chakra-ui/react';
import EditLink from '@components/EditLink';
import MDXRender from '@components/metrics/MDXRender';
import { css } from '@emotion/react';
import React, { ReactElement } from 'react';

interface Props {
	mdx: string;
}

export default function SystemRender({ mdx }: Props): ReactElement {
	return (
		<Box
			css={css`
				h3 {
					text-indent: 1em;
				}
				h4 {
					text-indent: 2em;
				}
				h5 {
					text-indent: 3em;
				}

				width: 100%;
			`}
		>
			<Stack spacing={8}>
				<MDXRender mdx={mdx} />
				<EditLink.System />
			</Stack>
		</Box>
	);
}
