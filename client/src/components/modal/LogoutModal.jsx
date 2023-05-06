import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LogOutModal = (props) => {
  const { open, handleClose, logOutFun } = props;
  return (
    <Modal show={open} onHide={handleClose} className="shadow">
    <Modal.Header closeButton className="bg-warning text-white">
      <Modal.Title>Logout</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center h5" >Are you sure? Do you want to log out?</Modal.Body>
    <Modal.Footer>
      <Button variant="warning" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={logOutFun}>
        Logout
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default LogOutModal;
