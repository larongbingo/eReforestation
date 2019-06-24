import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";

/**
 * This page should hold key information about:
 * - eReforestation
 * - mission
 * - vision
 * - past eReforestation(CMS)
 * - 5 newest news (CMS)
 */
export const Home: FunctionComponent = () => (
  <Layout title="eReforestation - Home">
    <Container>
      <div>Welcome to Next.js</div>
    </Container>
  </Layout>
);

export default Home;
