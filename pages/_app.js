import { createGlobalStyle, ThemeProvider } from "styled-components";
import React from "react";
import '../styles/antd.less'

export default function App({ Component, pageProps }) {
    return (
      <ThemeProvider theme={{}}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }