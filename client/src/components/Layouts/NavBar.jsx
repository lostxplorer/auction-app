import * as React from "react";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import LogOutModal from "../modal/LogoutModal";
import WalletModal from "../modal/wallet/WalletModal";
import WebCookies from "../common/Cookies/cookies";
import { useNavigate, useLocation } from "react-router-dom";
import WalletAPI from "../modal/wallet/WalletApi";
import { ToastContainer, toast } from "react-toastify";
import {Button, FormGroup, FormLabel, FormSelect, FormText, Nav, Navbar} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import RegisterApi from "../LoginPages/RegisterApi";
import Products from "../modal/ProductAddApi";
import {useEffect} from "react";
import {Input} from "@mui/material";
import "./NavBar.css"
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

// constants
const CONSUMER = "CONSUMER";

const NavBar = (props) => {
  const { getCurrentUser, getWalletDetails } = props;
  // state
  const [openLogoutModal, setLogoutModal] = React.useState(false);
  const [openWalletModal, setWalletModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [walletDetails, setWalletDetails] = React.useState("");
  const [complaintBox, setComplaintBox] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [productsList, setProductsList] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [complaintNote, setComplaintNote] = React.useState("");
  const CONSUMER = "CONSUMER";


  // toggle logout modal
  const handleLogoutClose = () => setLogoutModal(false);
  const handleLogoutopen = () => setLogoutModal(true);

  // toggle wallet modal
  const handleWalletClose = () => setWalletModal(false);
  const handleWalletopen = () => setWalletModal(true);
  const openComplaintBox = () => {
    setComplaintBox(true)
    getUsersList();
  };
  const closeComplaintBox = () => {
    setComplaintBox(false)
  };

  // handle loggout modal
  const logoutToggle = (data) => {
    if (data === "logout") {
      handleLogoutopen();
    } else {
      handleWalletopen();
    }
  };

  // Navigation hook
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate(`/`);
  };

  React.useEffect(() => {
    getUserInCookie();
  }, []);

  // Wallet API
  const getWallDeatil = (userName, callBack) => {
    WalletAPI.getApi(userName, callBack);
    getWalletDetails && getWalletDetails(walletDetails);
  };

  // post wallet amount
  const AddWallAmount = (data) => {
    WalletAPI.postApi(data, (response) => {
      if (response.status === "SUCCESS") {
        toast("Successfull");
      }
      getWallDeatil(data.wallet.userName, setWalletDetails);
      handleWalletClose();
    });
  };

  // get user cookies
  const getUserInCookie = () => {
    let cookie = WebCookies.GetCookie("userin");
    getCurrentUser && getCurrentUser(JSON.parse(cookie));
    setCurrentUser(JSON.parse(cookie));
    if (cookie) {
      getWallDeatil(JSON.parse(cookie).userName, setWalletDetails);
    }
  };

  // logout function
  const logOutFun = () => {
    WebCookies.RemoveCookie("userin");
    WebCookies.RemoveCookie("bidId");
    handleNavigation();
  };

  const logoutModal = (data, callBack) => {
    callBack(data);
  };
  const setUsersList = (res) => {
    setUserList(res.data.users);
    setSelectedUser(res.data.users[0]._id);
    getProductList(res.data.users[0]._id);
  }
  const getUsersList = () => {
    const role = currentUser.role === 'CONSUMER' ? 'PRODUCER' : 'CONSUMER'; 
    let qParams = 'role=' + role + "&currentUserName=" + currentUser?.userName;
    RegisterApi.getUsersListApi(setUsersList, qParams);
  };

  const createUserSelect = () =>  {
    let optionList = userList.length > 0 && userList.map((item, i) => {
      return <option key={i} value={item._id}>{item.userName}</option>
    }, this);
    return optionList;
  }

  const createProductSelect = () =>  {
    let optionList = productsList.length > 0 && productsList.map((item, i) => {
      return <option key={i} value={item.name}>{item.name}</option>
    }, this);
    return optionList;
  }
  const setProductsListss = (e) => {
    if(e.status === "SUCCESS") {
      setSelectedProducts(e.data.products[0].name)
      setProductsList(e.data.products)
    }
  }

  const getProductList = (id) => {
    let qParams = '?userId=' + id;
    Products.getApiCustomList(setProductsListss, qParams)
  }
  const handleUserSelection = (event) =>  {

    setSelectedUser(event.target.value);
    getProductList(event.target.value);
  }

  const handleComplaintSubmit = () => {
    let body = {
      'complaint': {
        'complaintBy' : currentUser.userName,
        'complaintOn' : selectedUser,
        'productName' : selectedProducts,
        'complaint' : complaintNote
      }
    }
    WalletAPI.postComplaint(body, () => {})
    closeComplaintBox();
  }

  return (
    <React.Fragment>
      <ToastContainer />
      {currentUser.role === CONSUMER}
      <WalletModal
        currentUser={currentUser}
        open={openWalletModal}
        walletDetails={walletDetails}
        walletAmount={
          walletDetails.data &&
          walletDetails.data.wallet &&
          walletDetails.data.wallet.amount
        }
        handleClose={handleWalletClose}
        AddWallAmount={(e) => AddWallAmount(e)}
      />
      <LogOutModal
        open={openLogoutModal}
        handleClose={handleLogoutClose}
        logOutFun={logOutFun}
      />

      <Modal show={complaintBox} onHide={closeComplaintBox} className="shadow">
        <Modal.Header closeButton className="bg-warning text-white">
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center h5" >
          <FormGroup style={{margin: '20px 0px', textAlign: 'left'}}>
            <FormLabel> Select user </FormLabel>
            <FormSelect
                name="role"
                type="select"
                required
                onChange={handleUserSelection}
            >
              {createUserSelect()}
            </FormSelect>
          </FormGroup>

          <FormGroup style={{margin: '20px 0px', textAlign: 'left'}}>
            <FormLabel> Select Product </FormLabel>
            <FormSelect
                name="role"
                type="select"
                required
                onChange={(e) =>  {setSelectedProducts(e.target.value)}}
            >
              {createProductSelect()}
            </FormSelect>
          </FormGroup>
          <FormGroup style={{textAlign: 'left'}}>
            <FormLabel> Type Your Complaint </FormLabel>
            <input className="complaintTextBox"
                   type="text"
                   value={complaintNote}
                    onChange={(e) => {setComplaintNote(e.target.value)}}/>
          </FormGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleComplaintSubmit}>
            Submit
          </Button>
          <Button variant="warning" onClick={closeComplaintBox}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
        <Navbar.Brand href="/products" style={{ marginLeft: "50px" }}>
          Coconut Bid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/products"
              active={location?.pathname === "/products"}
            >
              Products
            </Nav.Link>
            {currentUser?.role === "ADMIN" && (
              <Nav.Link href="/users" active={location?.pathname === "/users"}>
                Users
              </Nav.Link>
            )}

            {currentUser?.role === "ADMIN" && (
              <Nav.Link href="/user-complaints" active={location?.pathname === "/user-complaints"}>
                Complaints
              </Nav.Link>
            )}
          </Nav>
          <Nav>
          {currentUser?.role !== "ADMIN" && (
            <Nav.Link>
              <Button
                  variant="outline-light"
                  style={{ marginRight: "25px", fontSize: "large" }}
                  onClick={openComplaintBox}>
                Raise Complaint
              </Button>
            </Nav.Link>
          )}
            <Nav.Link>
              <span style={{ marginRight: "25px", fontSize: "large" }}>
                {currentUser?.userName}
              </span>
            </Nav.Link>
            {currentUser?.role === CONSUMER && (
              <Nav.Link eventKey={2}>
                <span onClick={() => logoutModal("wallet", logoutToggle)}>
                  <abbr title="Wallet">
                    <FaWallet
                      style={{
                        color: "white",
                        width: "35px",
                        height: "25px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </abbr>
                </span>
              </Nav.Link>
            )}
            <Nav.Link eventKey={2}>
              <span onClick={() => logoutModal("logout", logoutToggle)}>
                <abbr title="logout">
                  <FaSignOutAlt
                    style={{
                      color: "white",
                      width: "35px",
                      height: "25px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                  />
                </abbr>
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};
export default NavBar;
