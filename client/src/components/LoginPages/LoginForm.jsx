import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Form, useNavigate } from "react-router-dom";
import WebCookies from "../common/Cookies/cookies";
import LoginApi from "./LoginApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  // state
  let [state, setState] = useState({
    user: {
      userName: "",
      password: "",
    },
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Navigation hook
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/products`, { state: { page: "products" } });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    LoginApi.LoginApi(state, (res) => {
      if (res && res.status === 409) {
        toast("Enter valid username or password");
        setError(true);
      } else if (res && res.status === "SUCCESS") {
        handleCookies(res.data.user);
      } else {
        let message =
          res && res.data ? res.data.error.message : res && res.message;
        toast(message);
        setErrorMessage(res && res.data.error.message);
        setError(true);
      }
    });
  };

  // Handle input fields
  let changeInput = (event) => {
    setState((state) => ({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    }));
  };

  // loggin uers the cookies
  const handleCookies = (data) => {
    let userData = data;
    WebCookies.RemoveCookie("userin");
    WebCookies.SetCookie("userin", JSON.stringify(userData));
    handleNavigation();
  };

  return (
    <Fragment>
      <ToastContainer />
      <Row className="bg-success text-center text-white p-3 border rounded">
        <Col className="justify-content-center">
          <h3>Welcome to Coconut Bid</h3>
        </Col>
      </Row>
      <div className="login_form">
        <Container className="mt-5 ">
          <Row className="justify-content-center">
            <Col sm={12} md={8} lg={6}>
              <Form onSubmit={handleSubmit}>
                <Card className="shadow border border-success rounded">
                  <CardHeader className="text-center text-white bg-success">
                    <h4>Login Here</h4>
                  </CardHeader>
                  <Card.Body className="justify-content-center">
                    <FormGroup controlId="username" className="mb-3">
                      <FormLabel>User Name *</FormLabel>
                      <FormControl
                        name="userName"
                        type="text"
                        placeholder="User name"
                        required
                        onChange={changeInput}
                      />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="password">
                      <FormLabel>Password *</FormLabel>
                      <FormControl
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={changeInput}
                      />
                      <span className="text-danger">
                        {error ? errorMessage : ""}
                      </span>
                    </FormGroup>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-evenly text-center">
                    <Button size="sm" type="submit" variant="success">
                      Login
                    </Button>
                    <span className="ml-6">
                      Don't have an account? <a href="/signup"> Signup</a>
                    </span>
                    <span className="ml-6">
                      <a href="/forgot-password"> Forgot Password</a>
                    </span>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default LoginForm;
