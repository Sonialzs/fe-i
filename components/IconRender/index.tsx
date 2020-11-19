import { getIconByRoute } from '@service/category.config';
import React, { ReactElement } from 'react';

interface Props {
	category?: string;
	Icon?: ReactElement;
	width?: string;
	height?: string;
	size?: string;
}

export default function IconRender({
	category,
	Icon,
	width,
	height,
	size = '24px',
}: Props): ReactElement {
	return React.createElement(Icon || (category && getIconByRoute(category)), {
		width: width || size || null,
		height: height || size || null,
	});
}
