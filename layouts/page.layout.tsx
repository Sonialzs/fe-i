import { Box, Button, Flex, IconButton, useColorMode } from '@chakra-ui/core';
import Footer from '@components/Footer';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import React, { ReactElement } from 'react';
import CategoriesConfig from '@utils/category.config';
import dynamic from 'next/dynamic';

const FixedLogo = dynamic(() => import('@components/FixedLogo'), {
	ssr: false,
});

const StickyNav = styled(Flex)`
	position: sticky;
	z-index: 10;
	top: 0;
	backdrop-filter: saturate(180%) blur(20px);
	transition: background-color 0.1 ease-in-out;
`;

interface Props {}

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
	const navBgColor = {
		light: 'rgba(255, 255, 255, 0.8)',
		dark: 'rgba(23, 25, 35, 0.8)',
	};

	return (
		<>
			<StickyNav
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				// maxWidth="900px"
				width="100%"
				bg={navBgColor[colorMode]}
				as="nav"
				p={8}
				mt={[0, 0]}
				mb={[2, 8, 8, 8]}
				mx="auto"
			>
				<Box>
					{CategoriesConfig.available
						?.filter((cateogry) => cateogry.hide !== true)
						.map((category) => (
							<NextLink
								href={`/${category.routeName}/page/1`}
								passHref
								key={category.routeName}
							>
								<Button as="a" variant="ghost" p={[1, 4]}>
									{category.title}
								</Button>
							</NextLink>
						))}
				</Box>
				<IconButton
					aria-label="Toggle dark mode"
					icon={colorMode === 'dark' ? 'sun' : 'moon'}
					onClick={toggleColorMode}
				/>
			</StickyNav>
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
