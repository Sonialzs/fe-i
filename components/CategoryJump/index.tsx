import { Flex, Link, Text, useColorMode } from '@chakra-ui/react';
import IconRender from '@components/IconRender';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { BiLinkExternal } from 'react-icons/bi';

interface Props {
	total: number | string;
}

const textColor = {
	light: 'gray.500',
	dark: 'gray.300',
};

export default function CategoryJump({ total }: Props): ReactElement {
	const { colorMode } = useColorMode();
	const router = useRouter();

	return (
		<Flex
			boxShadow={' rgba(149, 157, 165, 0.2) 0px 8px 24px;'}
			borderRadius={4}
			w="100%"
			p={2}
			alignItems="center"
		>
			<IconRender iconName={router.query.category as string} size="6em" />
			<Text
				fontSize="sm"
				color={textColor[colorMode]}
				ml={4}
				letterSpacing={1}
			>
				已整理{total}个知识点和问题，
				<NextLink href={router.asPath + '/page/1'}>
					<Link>立即查看</Link>
				</NextLink>
				<BiLinkExternal />
			</Text>
		</Flex>
	);
}
