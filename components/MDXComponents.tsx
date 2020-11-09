import { Button, Code, Heading, Text } from '@chakra-ui/core';
const h1 = (props) => <Heading size="xl">{props.children}</Heading>;
const h2 = (props) => <Heading size="lg">{props.children}</Heading>;
const h3 = (props) => <Heading size="md">{props.children}</Heading>;
const h4 = (props) => <Heading size="sm">{props.children}</Heading>;
const h5 = (props) => <Heading size="xs">{props.children}</Heading>;
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
	h1,
	h2,
	h3,
	h4,
	h5,
	code: Code,
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
	Button: Button,
};
