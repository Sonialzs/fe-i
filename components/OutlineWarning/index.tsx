import { Alert, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { getFolderNameByRoute } from 'service/category.config';

interface Props {}

// 大纲页面的提醒
export default function OutlineWarning({}: Props): ReactElement {
	const router = useRouter();

	const getGithubEditLink = () => {
		const category = router.query.category as string;

		return `https://github.com/Xwil/fe-i/edit/master/content/${getFolderNameByRoute(
			category
		)}/index.mdx`;
	};

	return (
		<Link href={getGithubEditLink()} isExternal w="100%">
			<Alert status="warning" variant="left-accent">
				以下内容仅做参考，欢迎在Github上编辑
			</Alert>
		</Link>
	);
}
