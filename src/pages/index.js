import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/Layout"

import CCForm from "../components/form/CCForm.jsx"

export default () => (
  <Layout>
    <Container>
      <Row>
        <Col className="home">
          <CCForm />
        </Col>
      </Row>
    </Container>
  </Layout>
)
