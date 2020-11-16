import { Flex, useColorMode } from '@chakra-ui/react';
import Footer from '@components/Footer';
import { NavbarAsync } from '@components/Nav/async';
import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';

const FixedLogo = dynamic(() => import('@components/FixedLogo'), {
	ssr: false,
});

interface Props {}

// 普通页面的模板
export default function PageLayout({
	children,
}: Props & React.HTMLAttributes<HTMLDivElement>): ReactElement {
	const { colorMode, toggleColorMode } = useColorMode();

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
				bg={bgColor[colorMode]}
				color={primarytextColor[colorMode]}
				px={2}
			>
				{children}
				<FixedLogo />
				<Footer />
			</Flex>
		</>
	);
}
