import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { IconVercel } from '@components/Icons';
import NextLink from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';

interface Props {}

export default function Footer({}: Props): ReactElement {
	const [extraStyle, setExtraStyle] = useState({});

	// 对于高度不够的页面，让footer使用绝对定位显示在底部
	useEffect(() => {
		const footer = document.querySelector('footer');
		if (footer) {
			const distanceToTop = footer.getBoundingClientRect().top;
			const viewportHeight = window.innerHeight;

			if (distanceToTop < viewportHeight) {
				setExtraStyle({
					pos: 'absolute',
					bottom: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					zIndex: 1,
				});
			} else {
				setExtraStyle({
					zIndex: 1,
				});
			}
		}
	}, []);

	return (
		<Flex
			as="footer"
			align="center"
			direction="column"
			mt="2em"
			w="100%"
			// 默认隐藏，避免闪烁效果
			zIndex="-1"
			sx={extraStyle}
		>
			<div>
				<Link href="https://github.com/Xwil" title="GitHub" isExternal>
					<IconButton
						aria-label="GitHub"
						icon={<FiGithub />}
						size="lg"
						color="gray.500"
						variant="ghost"
					/>
				</Link>

				<Link href="mailto:xw5427@gmail.com" title="Email" isExternal>
					<IconButton
						aria-label="Email"
						icon={<MdMailOutline />}
						size="lg"
						color="gray.500"
						variant="ghost"
					/>
				</Link>
			</div>
			<div>
				<NextLink href="/uses" passHref>
					<Link
						fontSize="sm"
						color="gray.500"
						minWidth="100px"
						mr={2}
						title="Uses"
					>
						/uses
					</Link>
				</NextLink>
				<NextLink href="/blog" passHref>
					<Link
						fontSize="sm"
						color="gray.500"
						minWidth="100px"
						mr={2}
						title="blog"
					>
						/blog
					</Link>
				</NextLink>
			</div>
			<div>
				<Text fontSize="xs" color="gray.500">
					样式灵感来源于
					<Link isExternal href="https://leerob.io">
						leerob.io
					</Link>{' '}
					{' | '}
					部署于
					<Link isExternal href="https://vercel.com">
						Vercel
						<Box as="span" verticalAlign="text-bottom" ml={1}>
							<IconVercel />
						</Box>
					</Link>
				</Text>
			</div>
		</Flex>
	);
}
