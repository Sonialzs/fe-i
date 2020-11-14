import { useRequest } from 'ahooks';
import React, { ReactElement, useEffect } from 'react';

interface Props {
	slug: string;
}

export default function ViewCounter({ slug }: Props): ReactElement {
	// views+1
	const { data, run } = useRequest(`/api/views/set?id=${slug}`, {
		manual: true,
	});

	useEffect(() => {
		run();
	}, [slug]);

	return <div>{data?.total || '-'} 次浏览</div>;
}
