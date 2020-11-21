import { Box, Button, Text } from '@chakra-ui/react';
import Highlighter from '@components/CodeBlock/highlighter';
import { css } from '@emotion/react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { RiPlayMiniLine } from 'react-icons/ri';

interface Props {
	children?: any;
	className?: string;
}

export default function KlipseRender({
	children,
	className,
}: Props): ReactElement {
	const [result, setResult] = useState<string>('');
	const containerRef = useRef<HTMLDivElement>(null);
	const [showResult, setShowResult] = useState(false);

	useEffect(() => {
		// 配置klipse
		function addScript(url, id) {
			if (document.getElementById(id)) {
				console.log('已添加script标签，跳过本次添加:' + url);
				return;
			}
			var s = document.createElement('script');
			s.src = url;
			s.id = id;
			document.body.appendChild(s);
		}
		addScript(
			'https://storage.googleapis.com/app.klipse.tech/plugin_prod/js/klipse_plugin.min.js',
			'klipse-script'
		);
		// @ts-ignore
		window.klipse_settings = {
			selector_eval_js: '.language-klipse-eval-js', // css selector for the html elements you want to klipsify
			// ! 因为无法修改CodeMirror生成的样式，所以暂时弃用CodeMirror
			editor_type: 'dom',
		};
	}, []);

	// 解决脚本加载延迟
	useEffect(() => {
		if (!containerRef.current) {
			return;
		}
		const interval = setInterval(getResult, 1000);

		function getResult() {
			const result = containerRef.current!.querySelector(
				'.klipse-result'
			);
			if (result) {
				setResult(result.innerHTML);
				clearInterval(interval);
			}
		}

		return () => {
			clearInterval();
		};
	}, [containerRef]);

	return (
		<>
			{/* 代码渲染 */}
			<Highlighter className={className}>{children}</Highlighter>
			{/* 结果渲染 */}
			{showResult ? (
				<Text fontSize="xs">运行结果：</Text>
			) : (
				<Button
					size="xs"
					isLoading={!result}
					onClick={() => setShowResult(true)}
				>
					运行
					<RiPlayMiniLine />
				</Button>
			)}
			{showResult && result && (
				<Highlighter className={className}>{result}</Highlighter>
			)}
			<Box
				ref={containerRef}
				css={css`
					.language-klipse-eval-js {
						display: none;
					}

					.klipse-result {
						display: none;
					}
				`}
			>
				<code className="language-klipse-eval-js">{children}</code>
			</Box>
		</>
	);
}
