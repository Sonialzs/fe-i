import { Box, Button, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useToggle } from 'ahooks';
import NextLink from 'next/link';
import React, { ReactElement } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import CategoriesConfig from 'service/category.config';

const StickyHeader = styled(Flex)`
	position: sticky;
	z-index: 10;
	top: 0;
	backdrop-filter: saturate(180%) blur(20px);
	/* transition: background-color 0.1s ease-in-out; */

	@media (max-width: 40em) {
		.nav {
			position: absolute;
			top: 5em;
			left: -100vw;
			display: flex;
			flex-direction: column;
			width: 100%;
			transition: all 0.1s ease-in-out;

			a {
				margin-bottom: 1em;
			}
		}

		.nav.visible {
			left: 0;
		}
	}
`;

interface Props {}

export default function Navbar({}: Props): ReactElement {
	const { colorMode, toggleColorMode } = useColorMode();
	const [navVisible, { toggle: toggleNav }] = useToggle(false);
	const headerBgColor = {
		light: 'rgba(255, 255, 255, 0.8)',
		dark: 'rgba(23, 25, 35, 0.8)',
	};

	return (
		<StickyHeader
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			bg={headerBgColor[colorMode]}
			as="header"
			p={8}
			mt={[0, 0]}
			mb={[2, 8, 8, 8]}
			mx="auto"
		>
			<Box display={[null, 'none']}>
				<IconButton
					aria-label="Toggle menu"
					icon={navVisible ? <AiOutlineClose /> : <FiMenu />}
					onClick={() => toggleNav()}
				/>
			</Box>
			<Box
				as="nav"
				className={`nav ${navVisible && 'visible'}`}
				bg={headerBgColor[colorMode]}
			>
				{CategoriesConfig.available
					?.filter((cateogry) => cateogry.hide !== true)
					.map((category) => (
						<NextLink
							href={`/${category.routeName}/`}
							passHref
							key={category.routeName}
						>
							<Button
								as="a"
								variant="ghost"
								p={[1, 4]}
								leftIcon={
									category.icon &&
									React.createElement(category.icon)
								}
							>
								{category.title}
							</Button>
						</NextLink>
					))}
			</Box>
			<IconButton
				aria-label="Toggle dark mode"
				icon={colorMode === 'dark' ? <BiSun /> : <BiMoon />}
				onClick={toggleColorMode}
			/>
		</StickyHeader>
	);
}
