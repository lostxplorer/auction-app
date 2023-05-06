import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import queryString from 'query-string';
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

// Api
import ResetPasswordApi from "./ResetPasswordApi";

const ResetPassword = (props) => {
  let params = queryString.parse(window.location.search);
  // state
  let [state, setState] = useState({
    user: {
      email: params.email,
      password: "",
      confirmPassword: ""
    },
  });

  const [error, setError] = useState(false);

  // Navigate hook
  const navigate = useNavigate();

  // user details
  let { user } = state;

  // Handle user fields value
  let updateChange = (event) => {
    setState((state) => ({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    }));
  };

  // Handle signup
  let handleSubmit = (event) => {
    event.preventDefault();
    let resetPasswordValues = {
      user: {
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword
      },
    };
    ResetPasswordApi.resetPasswordApi(resetPasswordValues, (res) => {
      if (res.status === 404) {
        toast("User with email doesn't exist in the platform");
        setError(true);
      } else if (res?.data.data?.error?.description){
        toast(res?.data.data?.error?.description);
      } else if (res.status === "SUCCESS") {
        toast("Your password is reset, Please login");
        setTimeout(() => {
          navigate(`/`);
        }, [1000]);
      }
    });
  };

  return (
    <Fragment>
      <ToastContainer />
      <Row className="bg-success text-center text-white p-3 border rounded">
        <Col className="justify-content-center">
          <h3>Welcome to Coconut Bid</h3>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col sm md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Card className="shadow border border-success rounded">
                <CardHeader className="text-center text-white bg-success">
                  <h4>Reset Password</h4>
                </CardHeader>
                <Card.Body className="justify-content-center">
                  <FormGroup controlId="email" className="mb-3">
                    <FormLabel>your email (Non-Editable)</FormLabel>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        defaultValue={params.email}
                        required
                        onChange={updateChange}
                      readOnly/>
                    <span className="text-danger">
                      {error
                        ? "User does not exist in our platform "
                        : ""}
                    </span>
                  </FormGroup>
                  <FormGroup      
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="password"
                    >
                      <FormLabel>Password *</FormLabel>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={updateChange}
                      />
                    </FormGroup>
                    <FormGroup      
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="password"
                    >
                      <FormLabel>Confirm Password *</FormLabel>
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        onChange={updateChange}
                      />
                    </FormGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-evenly text-center">
                  <Button size="sm" type="submit" variant="success">
                    Reset Password 
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ResetPassword;
