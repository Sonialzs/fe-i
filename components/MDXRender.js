import React from 'react'
import MDX from '@mdx-js/runtime'
import MDXComponents from './MDXComponents'

export default function MDXRender(props) {
    return (
        <MDX components={MDXComponents}>{props.mdx}</MDX>
    )
}
