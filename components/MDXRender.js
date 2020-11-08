import React from 'react'
import MDX from '@mdx-js/runtime'
import { components } from '@pages/_app'

export default function MDXRender(props) {
    return (
        <MDX components={components}>{props.mdx}</MDX>
    )
}
