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
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
  Row,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

// Api
import RegisterApi from "./RegisterApi";
// roles
const PRODUCER = "PRODUCER";
const CONSUMER = "CONSUMER";

const Registration = (props) => {
  // state
  let [state, setState] = useState({
    user: {
      username: "",
      phone: "",
      aadhar: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const [error, setError] = useState(false);

  // Navigate hook
  const navigate = useNavigate();

  // Register user details
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

  // get role
  const getRoles = (data) => {
    if (data.role === "producer") {
      return PRODUCER;
    } else {
      return CONSUMER;
    }
  };

  // Handle signup
  let handleSubmit = (event) => {
    event.preventDefault();
    let registerValues = {
      user: {
        userName: user.username,
        phone: user.phone,
        aadhar: user.aadhar,
        email: user.email,
        password: user.password,
        role: getRoles(user),
        address: user.address,
      },
    };
    RegisterApi.registerPostApi(registerValues, (res) => {
      if (res.status === 409) {
        toast("Choose another user name");
        setError(true);
      } else if (res?.data.data?.error?.description){
        toast(res?.data.data?.error?.description);
      } else if (res.status === "SUCCESS") {
        toast("Successfuly registered");
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
                  <h4>Register Here</h4>
                </CardHeader>
                <Card.Body className="justify-content-center">
                  <FormGroup controlId="username" className="mb-3">
                    <FormLabel>User Name *</FormLabel>
                    <FormControl
                      name="username"
                      type="text"
                      placeholder="Enter name"
                      required
                      onChange={updateChange}
                    />
                    <span className="text-danger">
                      {error
                        ? "This user already existed under this name. "
                        : ""}
                    </span>
                  </FormGroup>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="formPhoneNumber"
                    >
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        name="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        inputMode="numeric"
                        required
                        pattern="\d{10}"
                        title="Please enter a 10-digit phone number"
                        onChange={updateChange}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Aadhar Number *</Form.Label>
                      <Form.Control
                        name="aadhar"
                        type="number"
                        placeholder="Enter aadhar number"
                        required
                        onChange={updateChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        onChange={updateChange}
                      />
                    </Form.Group>

                    <FormGroup
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="password"
                    >
                      <FormLabel>Password *</FormLabel>
                      <FormControl
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={updateChange}
                      />
                    </FormGroup>
                  </Row>
                  <FormGroup className="mb-3" controlId="role">
                    <FormLabel>Role *</FormLabel>
                    <FormSelect
                      name="role"
                      type="select"
                      required
                      onChange={updateChange}
                    >
                      <option>Select role</option>
                      <option value="producer">Producer</option>
                      <option value="consumer">Consumer</option>
                    </FormSelect>
                  </FormGroup>
                  <FormGroup className="mb-3" controlId="role">
                    <FormLabel>Address *</FormLabel>
                    <FormControl
                      name="address"
                      type="text"
                      required
                      onChange={updateChange}
                    >
                    </FormControl>
                  </FormGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-evenly text-center">
                  <Button size="sm" type="submit" variant="success">
                    Sign up
                  </Button>
                  <span className="ml-6">
                    have an account? <a href="/"> Login</a>
                  </span>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Registration;
