import { Flex, Link, Text, theme, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { getIconByRoute } from 'service/category.config';

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
			p={6}
			alignItems="center"
		>
			{React.createElement(
				getIconByRoute(router.query.category as string),
				{
					width: '42px',
					height: '42px',
				}
			)}
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
