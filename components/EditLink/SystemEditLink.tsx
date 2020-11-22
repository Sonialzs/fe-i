import { Alert, Link, LinkProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { getFolderNameByRoute } from 'service/category.config';
import { VscGithubAlt } from 'react-icons/vsc';

interface Props {}

// 大纲页面编辑链接
export default function SystemEditLink({
	...props
}: Props & LinkProps): ReactElement {
	const router = useRouter();

	const getGithubEditLink = () => {
		const category = router.query.category as string;

		return `https://github.com/Xwil/fe-i/edit/master/content/${getFolderNameByRoute(
			category
		)}/index.mdx`;
	};

	return (
		<Link
			href={getGithubEditLink()}
			isExternal
			w="100%"
			fontSize="sm"
			color="gray.400"
			{...props}
		>
			欢迎在Github
			<VscGithubAlt />
			上编辑
		</Link>
	);
}
