import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../Layouts/NavBar";
import GetProducts from "../../../Service/GetBidDetail";
import { Timer } from "../../common/timer/Timer";
import ProductsBiding from "./BidingAmountAPI";
import { ToastContainer, toast } from "react-toastify";
import BidHistory from "../../bidHistory/BidHistory";
import TimeReminder from "../../timeReminder";

const CONSUMER = "CONSUMER";

const BidDetail = () => {
  // Navigation hook
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState({
    userProductBidding: {
      userName: "",
      productId: "",
      biddingAmount: 0,
    },
  });
  const [userName, setUserName] = useState("");
  const [bidId, setBidId] = useState("");
  const [bidDetail, setBidDetail] = useState("");
  const [bidingHistory, setBidingHistory] = useState([]);
  const [time, setTime] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    getIdByUrl();
    getBidDetails(bidId);
    getBidHistory(bidId);

    setInterval(() => {
      bidId && getBidHistory(bidId);
    }, 10000);
  }, [bidId]);

  // set product id
  function getIdByUrl() {
    let bidId = location && location.state && location.state.id;
    let role = location && location.state && location.state.currentUser.role;
    setRole(role);

    if (!bidId) {
      navigate(`/page-not-found`);
    }
    setBidId(bidId);
  }

  // get product detail based by Id
  const getBidDetails = (bidId) => {
    if (bidId) {
      GetProducts.getBidById(bidId, (res) => {
        if (res) {
          setBidDetail(res.data && res.data.product && res.data.product);
        } else {
          navigate(`/page-not-found`);
        }
      });
    }
  };

  const getBidHistory = (id) => {
    ProductsBiding.getBidById(id, (res) => {
      if (res.data && res.data.userProductBiddings.length > 0) {
        setBidingHistory(res.data.userProductBiddings);
      } else {
        toast(res && res.message);
      }
    });
  };

  // handle bid amount
  const handleBidAmount = (event) => {
    setState((state) => ({
      userProductBidding: {
        ...state.bid,
        productId: bidId,
        userName: userName,
        [event.target.name]: parseInt(event.target.value),
      },
    }));
  };

  const getCurrentUser = (data) => {
    setUserName(data.userName);
  };

  // handle bidding amount submit
  const handleSubmit = (event) => {
    event.preventDefault();
    ProductsBiding.postApi(state, (res) => {
      if (res) {
        if (res.status === "SUCCESS") {
          toast(res.status);
          getBidHistory(bidId);
        } else if (res.status !== 200) {
          if (
            res.data.data.error.message ===
            "ERR_BIDDING_AMOUNT_SHOULD_BE_GREATER_THAN_BASE_PRICE"
          ) {
            toast("Bidding amount should be greater than the base price");
          } else if (
            res.data.data.error.message ===
            "ERR_BIDDING_AMOUNT_SHOULD_BE_GREATER_THAN_LAST_BIDING_AMOUNT"
          ) {
            toast(
              "Bidding amount should be greater than the last bidding amount"
            );
          }
          
          else if (
            res.data.data.error.message ===
            "ERR_BIDDING_AMOUNT_SHOULD_BE_GREATER_THAN_WALLET_AMOUNT"
          ) {
            toast(
              "Bidding amount should be greater than the WALLET amount"
            );
          }

        } else {
          toast(res && res.message);
        }
      }
    });
  };

  // getting bid item time to disable biding button
  const getTimeInterVal = (time) => {
    if (time && Math.sign(time) === -1) {
      getBidDetails(bidId);
    }
    setTime(time);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Row>
        <NavBar getCurrentUser={getCurrentUser} />
      </Row>
      <Container className="shadow mt-5 p-3">
        <Row>
          <Col className="m-2">
            <div className="d-flex justify-content-center">
              <Image
                width={250}
                height={250}
                className="shadow flex-warp"
                variant="success"
                alt={bidDetail?.name}
                src={bidDetail?.imageUrl}
              />
            </div>
            <Row className="m-5">
              <div className="mt-3 d-flex justify-content-between">
                <div>
                  <h6>Name:</h6>
                </div>
                <div>
                  <h6>{bidDetail?.name}</h6>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h6>Quantity:</h6>
                </div>
                <div>
                  <h6>{bidDetail?.noOfUnits}</h6>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h6>Base Price:</h6>
                </div>
                <div>
                  <h6>&#8377; {bidDetail?.basePrice}</h6>
                </div>
              </div>
            </Row>
            <Row className="m-5">
              <span className="mt-3 d-grid bg-danger text-white text-center">
                {Math.sign(time) === -1 ? "Bid Ended" : "Bid Ends In"}
              </span>
              <Col className="m-1 text-center z-index-1">
                <Timer
                  deadTime={bidDetail?.bidEndDate}
                  getTimeInterVal={getTimeInterVal}
                />
              </Col>
            </Row>
          </Col>

          <Col className="m-4">
            {time && Math.sign(time) !== -1 && bidingHistory.length > 0 ? (
              <Row>
                <TimeReminder bidingHistory={bidingHistory} />
              </Row>
            ) : (
              ""
            )}

            {role === CONSUMER ? (
              <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between mt-4">
                  <InputGroup>
                    <InputGroup.Text>&#8377;</InputGroup.Text>
                    <Form.Control
                      name="biddingAmount"
                      type="number"
                      placeholder="Enter your bid amount"
                      required
                      onChange={handleBidAmount}
                    />
                  </InputGroup>
                </div>
                <div className="mt-3 d-grid text-center">
                  <Button
                    type="submit"
                    variant="success"
                    size="small"
                    disabled={Math.sign(time) === -1 ? true : false}
                  >
                    Bid Now
                  </Button>
                </div>
              </Form>
            ) : (
              ""
            )}

            <div className="mt-4 overflow-auto">
              <div className="mb-2 d-flex justify-content-start">
                <h4 className="bid-history-header ">Bid History</h4>
              </div>
              <div className="d-flex justify-content-center">
                {bidingHistory && bidingHistory.length > 0 ? (
                  <BidHistory bidHistory={bidingHistory} time={time} />
                ) : (
                  <div className="d-flex justify-content-center mt-2">
                    <h5> No Bid history,was found!. </h5>{" "}
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BidDetail;
