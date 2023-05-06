import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
import ForgotPasswordApi from "./ForgotPasswordApi";

const ForgotPassword = (props) => {
  // state
  let [state, setState] = useState({
    user: {
      email: "",
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
    let forgotPasswordValues = {
      user: {
        email: user.email,
      },
    };
    ForgotPasswordApi.forgotPasswordPostApi(forgotPasswordValues, (res) => {
      if (res.status === 404) {
        toast("User with email doesn't exist in the platform");
        setError(true);
      } else if (res?.data.data?.error?.description){
        toast(res?.data.data?.error?.description);
      } else if (res.status === "SUCCESS") {
        toast("Sent reset password link to your email");
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
                  <h4>Forgot Password</h4>
                </CardHeader>
                <Card.Body className="justify-content-center">
                  <FormGroup controlId="email" className="mb-3">
                    <FormLabel>Enter your user email *</FormLabel>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={updateChange}
                      />
                    <span className="text-danger">
                      {error
                        ? "User does not exist in our platform "
                        : ""}
                    </span>
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

export default ForgotPassword;
