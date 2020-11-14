import PageLayout from '@layouts/page.layout';
import { useRequest } from 'ahooks';
import React, { ReactElement, useEffect } from 'react';

interface Props {}

export default function index({}: Props): ReactElement {
	// const { data, run } = useRequest(`/api/set-page-views?id=${123}`, {
	// 	manual: true,
	// 	onSuccess() {
	// 		console.log(data);
	// 	},
	// });

	useEffect(() => {
		fetch(`/api/views/set-page-views?id=${123}`);
	}, []);

	return (
		<>
			<PageLayout />
		</>
	);
}
