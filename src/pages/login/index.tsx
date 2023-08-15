import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login, checkSession, setPassword } from "../../redux/actions";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  useEffect(() => {
    if (localStorage.getItem("psb-auth-bearer-token")) {
      window.location.href = "/";
    }
  }, []);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: any = useDispatch();

  const loginSubmit = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // setSubmitting(true);

    // setTimeout(() => {
    //   setSubmitting(false)
    //   router.push('/')
    // }, 2000)

    dispatch(login({ email, password }));
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>

                  <form onSubmit={loginSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        name="username"
                        required
                        disabled={submitting}
                        placeholder="Username"
                        aria-label="Username"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                        aria-label="Password"
                      />
                    </InputGroup>

                    <Row>
                      <Col xs={6}>
                        <Button
                          className="px-4"
                          variant="primary"
                          type="submit"
                          disabled={submitting}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
