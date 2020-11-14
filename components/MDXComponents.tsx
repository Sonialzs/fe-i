import {
	Box,
	Button,
	Code,
	Divider,
	Heading,
	Kbd,
	Link,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import CodeBlock from './CodeBlock';

// 滚动条深色适配
const Table = (props) => (
	<Box overflowX="auto" w="full">
		<Box as="table" textAlign="left" mt="32px" w="full" {...props} />
	</Box>
);

const THead = (props) => {
	const { colorMode } = useColorMode();
	const bg = {
		light: 'gray.50',
		dark: 'whiteAlpha.100',
	};

	return (
		<Box
			as="th"
			bg={bg[colorMode]}
			fontWeight="semibold"
			p={2}
			fontSize="sm"
			{...props}
		/>
	);
};

const TData = (props) => (
	<Box
		as="td"
		p={2}
		borderTopWidth="1px"
		borderColor="inherit"
		fontSize="sm"
		whiteSpace="normal"
		{...props}
	/>
);

const CustomLink = (props) => {
	const { colorMode } = useColorMode();
	const color = {
		light: 'hsl(208, 99%, 44%)',
		dark: 'hsl(208, 95%, 68%)',
	};

	const href = props.href;
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'));

	if (isInternalLink) {
		return (
			<NextLink href={href} passHref>
				<Link color={color[colorMode]} {...props} />
			</NextLink>
		);
	}

	return <Link color={color[colorMode]} isExternal {...props} />;
};

// TODO  ! chakra-ui 1.0移除了callout
const Quote = (props) => {
	const { colorMode } = useColorMode();
	const bgColor = {
		light: 'blue.50',
		dark: 'blue.900',
	};

	return (
		<Box
			mt={4}
			w="98%"
			bg={bgColor[colorMode]}
			variant="left-accent"
			status="info"
			css={{
				'> *:first-of-type': {
					marginTop: 0,
					marginLeft: 8,
				},
			}}
			{...props}
		/>
	);
};

const DocsHeading = (props) => (
	<Heading
		css={{
			scrollMarginTop: '100px',
			scrollSnapMargin: '100px', // Safari
			'&[id]': {
				pointerEvents: 'none',
			},
			'&[id]:hover a': { opacity: 1 },
		}}
		{...props}
		mb="0.5em"
		mt="0.3em"
	></Heading>
);
const Hr = () => {
	const { colorMode } = useColorMode();
	const borderColor = {
		light: 'gray.200',
		dark: 'gray.600',
	};

	return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

const i = (props) => <Text as="i">{props.children}</Text>;
const u = (props) => <Text as="u">{props.children}</Text>;
const abbr = (props) => <Text as="abbr">{props.children}</Text>;
const cite = (props) => <Text as="cite">{props.children}</Text>;
const del = (props) => <Text as="del">{props.children}</Text>;
const em = (props) => <Text as="em">{props.children}</Text>;
const ins = (props) => <Text as="ins">{props.children}</Text>;
const kbd = (props) => <Text as="kbd">{props.children}</Text>;
const mark = (props) => <Text as="mark">{props.children}</Text>;
const s = (props) => <Text as="s">{props.children}</Text>;
const samp = (props) => <Text as="samp">{props.children}</Text>;
const sub = (props) => <Text as="sub">{props.children}</Text>;
const sup = (props) => <Text as="sup">{props.children}</Text>;

export default {
	h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
	h2: (props) => (
		<DocsHeading as="h2" fontWeight="bold" size="lg" {...props} />
	),
	h3: (props) => (
		<DocsHeading as="h3" size="md" fontWeight="bold" {...props} />
	),
	code: CodeBlock,
	inlineCode: (props) => (
		<Code colorScheme="yellow" fontSize="0.84em" {...props} />
	),
	i,
	u,
	abbr,
	cite,
	del,
	em,
	ins,
	kbd,
	mark,
	s,
	samp,
	sub,
	sup,

	// @ts-ignore
	kbd,
	br: (props) => <Box height="24px" {...props} />,
	hr: Hr,
	table: Table,
	th: THead,
	td: TData,
	a: CustomLink,
	p: (props) => <Text as="p" mt={4} lineHeight="tall" {...props} />,
	ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
	ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
	li: (props) => <Box as="li" pb={1} {...props} />,
	blockquote: Quote,
	Button,
};

export { CustomLink };
