import React, { ReactElement } from 'react';

interface Props {
	children?: any;
}

export default function Script({ children }: Props): ReactElement {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `<script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${process.env.BAIDU_KEY}";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
        `,
			}}
		/>
	);
}
