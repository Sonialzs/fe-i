import { Flex, useColorMode } from '@chakra-ui/react';
import { FooterAsync } from '@components/Footer/async';
import { NavbarAsync } from '@components/Nav/async';
import React, { ReactElement } from 'react';

interface Props {}

// 普通页面的模板
export default function PageLayout({
	children,
}: Props & React.HTMLAttributes<HTMLDivElement>): ReactElement {
	const { colorMode } = useColorMode();

	const bgColor = {
		light: 'white',
		dark: 'gray.900',
	};
	const primarytextColor = {
		light: 'black',
		dark: 'white',
	};

	return (
		<>
			<NavbarAsync />
			<Flex
				as="main"
				justifyContent="center"
				flexDirection="column"
				minH="70vh"
				bg={bgColor[colorMode]}
				color={primarytextColor[colorMode]}
				px={2}
			>
				{children}
			</Flex>

			<FooterAsync />
		</>
	);
}
