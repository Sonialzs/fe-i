import { Text, TextProps } from '@chakra-ui/react';
import { useRequest } from 'ahooks';
import React, { ReactElement, useEffect } from 'react';

interface Props {
	slug: string;
}

export default function ViewCounter({
	slug,
	...props
}: Props & TextProps): ReactElement {
	// views+1
	const { data, run } = useRequest(`/api/views/set?id=${slug}`, {
		manual: true,
	});

	useEffect(() => {
		// 开发模式下不计算浏览次数
		if (process.env.NODE_ENV !== 'development') {
			run();
		}
	}, [slug]);

	return (
		<Text as="span" fontSize="sm" color="gray.500" {...props}>
			{data?.total || '-'} 次浏览
		</Text>
	);
}
