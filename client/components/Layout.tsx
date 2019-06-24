import React, { FunctionComponent, CSSProperties } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";

import { PageNavbar } from "./PageNavbar";
import { Footer } from "./Footer";

export const Layout: FunctionComponent<{title: string}> = ({children, title}) => 
<>
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <PageNavbar />
  <div style={Layout_Div_MaxMinHeight}>{children}</div>
  <Footer/>
</>;

const Layout_Div_MaxMinHeight: CSSProperties = {
  minHeight: "100vh"
};

export default Layout;
