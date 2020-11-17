import { Flex, Text, theme, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { getIconByRoute } from 'service/category.config';

interface Props {
	total: number | string;
}

const borderColor = {
	light: theme.colors.gray[50],
	dark: theme.colors.gray[800],
};

const textColor = {
	light: 'gray.500',
	dark: 'gray.300',
};

export default function CategoryJump({ total }: Props): ReactElement {
	const { colorMode } = useColorMode();
	const router = useRouter();

	return (
		<Link href={router.asPath + '/page/1'}>
			<Flex
				border={`1px solid ${borderColor[colorMode]}`}
				boxShadow={' rgba(149, 157, 165, 0.2) 0px 8px 24px;'}
				borderRadius={4}
				w="100%"
				p={6}
				alignItems="center"
				cursor="pointer"
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
					已整理{total}
					个知识点和问题
				</Text>
			</Flex>
		</Link>
	);
}
