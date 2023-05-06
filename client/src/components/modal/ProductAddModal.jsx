import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import WebCookies from "../common/Cookies/cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductAddModal = (props) => {
  // get props
  const { open, toggle, getProductData } = props;

  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [currentUser, setCurrentUser] = useState("");
  const [image, setImage] = useState(null);

  let [state, setState] = useState({
    product: {
      producerId: currentUser && currentUser._id,
      name: "",
      basePrice: "",
      bidStartDate: "",
      bidEndDate: "",
      noOfUnits: "",
      imageUrl: "",
      productType: ""
    },
  });

  useEffect(() => {
    getUserInCookie();
  }, []);

  // get cookies
  const getUserInCookie = () => {
    let cookie = WebCookies.GetCookie("userin");
    setCurrentUser(JSON.parse(cookie));
  };

  // Handle user fields value
  let updateChange = (event) => {
    setState((state) => ({
      product: {
        ...state.product,
        producerId: currentUser && currentUser._id,
        [event.target.name]: event.target.value,
      },
    }));
  };

  // handle image upload
  const handleImageUpload = (event) => {
    const file = event?.target?.files[0];
    setBase64Image(file, setImage);
  };

  // Set imageurl in state
  const setBase64Image = (file, setImage) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  // havndle validation
  const checkValidation = (data, callBack) => {
    let currentDate = Date.parse(new Date());
    let startDate = Date.parse(data && data.product.bidStartDate);
    let endDate = Date.parse(data && data.product.bidEndDate);

    if (endDate === (startDate || currentDate)) {
      toast("End date must greater than start date");
      callBack(false);
    } else {
      callBack(true);
    }
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    let values = state;
    values.product.basePrice = values.product
      ? parseInt(values.product.basePrice)
      : 0;
    values.product.noOfUnits = values.product
      ? parseInt(values.product.noOfUnits)
      : 1;
    values.product.imageUrl = image;
    values.product.bidStartDate = startDate ? startDate.$d : startDate;
    values.product.bidEndDate = endDate ? endDate.$d : endDate;
    checkValidation(values, (valid) => {
      if (valid) {
        getProductData(values);
      }
    });
  };

  return (
    <Fragment>
      <ToastContainer />
      <Modal
        show={open}
        onHide={toggle}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <FormGroup controlId="name" className="mb-3">
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl
                      name="name"
                      type="text"
                      placeholder="Product"
                      required
                      onChange={updateChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup controlId="basePrice" className="mb-3">
                    <FormLabel>Basic Price*</FormLabel>
                    <FormControl
                      name="basePrice"
                      type="number"
                      placeholder="Price"
                      required
                      onChange={updateChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <FormGroup controlId="bidStartDate" className="mb-3">
                    <FormLabel>Start Date *</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2}>
                        <DateTimePicker
                          name="bidStartDate"
                          renderInput={(params) => <TextField {...params} />}
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup controlId="bidEndDate" className="mb-3">
                    <FormLabel>End Date *</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2}>
                        <DateTimePicker
                          renderInput={(params) => <TextField {...params} />}
                          value={endDate}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <FormGroup>
                    <Form.Label htmlFor="basic-url">Quantity *</Form.Label>
                    <Form.Control
                      name="noOfUnits"
                      id="basic-url"
                      placeholder="Enter quantity"
                      type="number"
                      aria-describedby="basic-addon3"
                      onChange={updateChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Product Type
                    </Form.Label>
                    <Form.Select
                     name="productType"
                     type="select"
                     required
                     onChange={updateChange}
                    >
                    <option>Select product type</option>
                      <option value="coconut">Coconut</option>
                      <option value="dryCoconut">Dry Coconut</option>
                      <option value="tenderCoconut">Tender Coconut</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12}>
                  <FormGroup>
                    <Form.Label htmlFor="basic-url">Upload Image *</Form.Label>
                    <Form.Control
                      name="imageUrl"
                      id="basic-url"
                      type="file"
                      aria-describedby="basic-addon3"
                      onChange={handleImageUpload}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col>
                <Button type="submit" variant="success">
                  Add Product
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default ProductAddModal;
