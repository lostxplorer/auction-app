import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WalletModal = (props) => {
  const {
    open,
    handleClose,
    walletDetails,
    currentUser,
    AddWallAmount,
    walletAmount,
  } = props;

  let [state, setState] = useState({
    wallet: {
      userName: "",
      amount: "",
    },
  });

  useEffect(() => {
    updateWalletAmount();
  }, [walletAmount]);

  // hanlde wallet update
  const updateWalletAmount = () => {
    setState(() => ({
      wallet: {
        amount: walletAmount ? walletAmount : "",
      },
    }));
  };

  // hanlde bit amount
  const handleBidAmount = (event) => {
    setState((state) => ({
      wallet: {
        ...state.wallet,
        userName: currentUser.userName,
        [event.target.name]: event.target.value,
      },
    }));
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    AddWallAmount(state);
  };

  return (
    <Modal show={open} onHide={handleClose} className="shadow">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="bg-warning text-white">
          <Modal.Title>Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center h5">
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col>
              <Form.Label column>Wallet Amount * </Form.Label>
              <Form.Control
                name="amount"
                type="number"
                placeholder="Enter wallet amount"
                required
                value={state.wallet.amount}
                onChange={handleBidAmount}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="warning" onClick={handleClose}>
          Close
        </Button> */}
          <Button variant="primary" type="submit">
            {walletDetails.message === "Request failed with status code 404"
              ? "Save"
              : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default WalletModal;
