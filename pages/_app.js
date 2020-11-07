import { createGlobalStyle, ThemeProvider } from "styled-components";
import React from "react";
import '../styles/antd.less'
import { Reset } from "styled-reset";
import request from "umi-request";

export default function App({ Component, pageProps }) {
    return (
      <ThemeProvider theme={{}}>
        <Reset/>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  