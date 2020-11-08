import { createGlobalStyle, ThemeProvider } from "styled-components";
import React from "react";
import '../styles/antd.less'
import { Reset } from "styled-reset";
import {MDXProvider} from '@mdx-js/react'
import { Button } from "antd";

export const components = {
  Button
}

export default function App({ Component, pageProps }) {
    return (
      <ThemeProvider theme={{}}>
        <MDXProvider components={components}>
        <Reset/>
        <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    );
  }

  