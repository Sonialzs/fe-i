// TODO 待优化
import { Box, theme, useColorMode } from '@chakra-ui/react';
import MDXComponents from '@components/MDXComponents';
import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useRef } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

interface Props {
	children?: any;
}

const background = {
	light: theme.colors.gray[50],
	dark: theme.colors.gray[800],
};

const borderColor = {
	light: theme.colors.gray[200],
	dark: theme.colors.gray[700],
};

const StyledEditor = styled(Box)`
	// 清除focus时的outline
	textarea:focus {
		outline: none;
	}
`;

export default function Live({ children }: Props): ReactElement {
	const ref = useRef<HTMLDivElement>();
	const { colorMode } = useColorMode();

	useEffect(() => {
		if (ref.current) {
			const dom = ref.current! as HTMLDivElement;
			dom.querySelector('div')!.style.fontFamily =
				'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace';

			dom.querySelectorAll('.token-line').forEach((line) =>
				line.removeAttribute('style')
			);

			clearLiveInlineStyles(dom);
		}
	}, [ref]);

	return (
		<Box>
			<LiveProvider
				code={children}
				scope={{ ...MDXComponents }}
				// ! 一堆bug，暂时用全局样式渲染
				// theme={liveTheme[colorMode]}
			>
				<StyledEditor
					as="div"
					// @ts-ignore
					ref={ref}
					background={background[colorMode]}
					border={`1px solid ${borderColor[colorMode]}`}
					borderRadius={theme.radii.lg}
					borderTopRadius="0"
					fontSize="0.9rem"
					px={theme.space[4]}
				>
					<LiveEditor
						onChange={() => clearLiveInlineStyles(ref.current!)}
					/>
				</StyledEditor>
				<LivePreview />
				<LiveError />
			</LiveProvider>
		</Box>
	);
}

function clearLiveInlineStyles(dom: HTMLElement) {
	dom &&
		removeInlineStyle(dom, [
			'.keyword',
			'.punctuation',
			'.number',
			'.operator',
			'.tag',
			'.string',
		]);
}

function removeInlineStyle(dom: HTMLElement, selectors: string | string[]) {
	if (Array.isArray(selectors)) {
		selectors.forEach((selector) => {
			dom.querySelectorAll(selector).forEach((el) =>
				el.removeAttribute('style')
			);
		});
	} else {
		dom.querySelectorAll(selectors).forEach((el) =>
			el.removeAttribute('style')
		);
	}
}
