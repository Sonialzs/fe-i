import { Flex, IconButton, Link, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FiGithub } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';

interface Props {}

export default function Footer({}: Props): ReactElement {
	return (
		<Flex
			as="footer"
			align="center"
			direction="column"
			mt="2em"
			pb="1em"
			w="100%"
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

				<Link href="mailto:hi@kodin.fun" title="Email" isExternal>
					<IconButton
						aria-label="Email"
						icon={<MdMailOutline />}
						size="lg"
						color="gray.500"
						variant="ghost"
					/>
				</Link>
			</div>
			{/* <div>
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
			</div> */}
			<div>
				<Text fontSize="xs" color="gray.500">
					{/* 样式灵感来源于
					<Link isExternal href="https://leerob.io">
						leerob.io
					</Link>
					{' | '} */}
					部署于
					<Link isExternal href="https://vercel.com">
						Vercel
					</Link>
					{/* <IconRender iconName="vercel" size="12" /> */}
				</Text>
			</div>
		</Flex>
	);
}
