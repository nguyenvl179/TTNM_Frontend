import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Navbar as NavContainer,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { access_token } from "../../config/AuthConfig";
import AuthService from "../../services/AuthService";

export default function Navbar({ searchText, setSearchText }) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <NavContainer
      sticky="top"
      className="bg-light d-flex justify-content-between"
      style={{ height: 50 }}
    >
      <Container>
        <NavContainer.Brand style={{ color: "#0000FF" }} href="/">
          NQPH.
        </NavContainer.Brand>
      </Container>
      <Container className="d-flex align-items-center justify-content-end gap-3">
        {access_token ? (
          <span
            className="bg-light shadow-lg rounded-pill p-1 px-2"
            style={{ cursor: "pointer" }}
            onClick={() => AuthService.logout()}
          >
            Đăng xuất
          </span>
        ) : (
          <span
            className="bg-light shadow-lg rounded-pill px-1"
            onClick={() => setIsLogin(true)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPlusCircle} size="lg" color="#0000FF" />
          </span>
        )}
      </Container>
      <ModalLogin show={isLogin} setShow={() => setIsLogin(false)} />
    </NavContainer>
  );
}

const ModalLogin = ({ show, setShow }) => {
  const userRef = useRef("");
  const passRef = useRef("");
  const [isSuccess, setIsSuccess] = useState("");
  const hanldeLogin = () => {
    let formData = new FormData();
    formData.append("username", userRef.current.value);
    formData.append("password", passRef.current.value);
    AuthService.login(formData).then((res) => {
      if (res !== 200) {
        setIsSuccess("Đăng nhập thất bại");
      }
    });
  };
  return (
    <Modal show={show} onHide={setShow} centered>
      <ToastContainer className="position-fixed" position="bottom-end">
        <Toast
          show={isSuccess !== ""}
          onClose={() => setIsSuccess("")}
          autohide
        >
          <h5 className="text-alert m-2">{isSuccess}</h5>
        </Toast>
      </ToastContainer>
      <Modal.Header>Đăng nhập</Modal.Header>
      <Modal.Body>
        <Form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              hanldeLogin();
            }
          }}
        >
          <Form.Group>
            <Form.Label>Tên đăng nhập:</Form.Label>
            <Form.Control ref={userRef} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control ref={passRef} type="password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Button onClick={() => hanldeLogin()} className="m-3 mt-0">
        ĐĂNH NHẬP
      </Button>
    </Modal>
  );
};
