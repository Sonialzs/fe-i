import React, { ReactElement } from 'react';
import NextLink from 'next/link';
import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Footer from '@components/Footer';

const StickyNav = styled(Flex)`
	position: sticky;
	z-index: 10;
	top: 0;
	backdrop-filter: saturate(180%) blur(20px);
	transition: background-color 0.1 ease-in-out;
`;

interface Props {
	categories: string[];
}

export default function PageLayout({
	categories,
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
				maxWidth="900px"
				width="100%"
				bg={navBgColor[colorMode]}
				as="nav"
				p={8}
				mt={[0, 0]}
				mb={8}
				mx="auto"
			>
				<IconButton
					aria-label="Toggle dark mode"
					icon={colorMode === 'dark' ? 'sun' : 'moon'}
					onClick={toggleColorMode}
				/>
				<Box>
					{categories.map((category) => (
						<NextLink href={`/${category}/1`} passHref>
							<Button as="a" variant="ghost" p={[1, 4]}>
								{category}
							</Button>
						</NextLink>
					))}
				</Box>
			</StickyNav>
			<Flex
				as="main"
				justifyContent="center"
				flexDirection="column"
				bg={bgColor[colorMode]}
				color={primarytextColor[colorMode]}
				px={8}
			>
				{children}
				<Footer />
			</Flex>
		</>
	);
}