import React from "react";
import { Card, Container, Nav, Row } from "react-bootstrap";
import { infoUser } from "../../config/AuthConfig";
import './style.css'
export default function Sidebar() {
  return (
    <Container style={{ padding: 0, width: '250px' }}>
      <Card style={{ border: "none", margin: 20 }}>
        <Card.Header
          className="m-auto mb-2"
          style={{
            background: "none",
            border: "none",
            width: 200,
            height: 200,
          }}
        >
          <Card.Img
            src="https://picsum.photos/300/?grayscale"
            style={{ border: "4px #0000FF solid" }}
            className="rounded-circle"
          />
        </Card.Header>
        <Card.Body className="p-2 text-center">{infoUser && infoUser.hten}</Card.Body>
      </Card>
      <div className="d-flex flex-column gap-2 list-nav">
        <Nav.Link className="text-center">Động vật</Nav.Link>
        {/* <Nav.Link className="text-center">Tài khoản</Nav.Link> */}
      </div>
    </Container>
  );
}
