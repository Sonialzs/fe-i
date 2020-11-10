import { Box, Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import _ from 'lodash';

const Fixed = styled(Flex)`
	position: fixed;
	right: 2em;
	bottom: 2em;

	cursor: pointer;

	z-index: 99;
`;

const Drag = styled(motion.div)`
	width: 80px;
	height: 30px;
	& > img {
		pointer-events: none;
	}
`;

interface Props {}

interface DragConstraintsType {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export default function FixedLogo({}: Props): ReactElement {
	const [constraints, setConstrains] = useState<DragConstraintsType>();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current || !setConstrains) {
			return;
		}
		caculateConstraints(ref.current);

		const resizeHandler = _.throttle(() => {
			ref.current && caculateConstraints(ref.current);
		}, 300);

		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, [ref]);

	// 计算拖拽限制区域，不让logo移动到viewport外
	const caculateConstraints = (element: HTMLDivElement) => {
		const distanceToRight =
			window.innerWidth - element.getBoundingClientRect().right;
		const distanceToLeft = element.getBoundingClientRect().left;
		const distanceToTop = element.getBoundingClientRect().top;
		const distanceToBottom =
			window.innerHeight - element.getBoundingClientRect().bottom;
		const result = {
			right: distanceToRight,
			left: -distanceToLeft,
			top: -distanceToTop,
			bottom: distanceToBottom,
		};
		setConstrains(result);
	};

	return (
		<Fixed>
			<Drag drag dragConstraints={constraints} dragElastic={1} ref={ref}>
				<img src="/static/logo/logo_transparent_short.png" alt="" />
			</Drag>
		</Fixed>
	);
}
