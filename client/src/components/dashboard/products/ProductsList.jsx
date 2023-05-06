import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import "./ProductsList.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import WebCookies from "../../common/Cookies/cookies";
import ProductAddModal from "../../modal/ProductAddModal";
import AddProducts from "../../modal/ProductAddApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NoRecordsFound from "../../NoRecordsFound";
import Spinner from "../../Spinner";
import CoConutCard from "../../card/Card";

const PRODUCER = "PRODUCER";

const ProductsList = () => {
  const [state, setState] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [addProductModalOpen, setAddProductModaloOpen] = useState(false);
  const [time, setTime] = useState();
  const [walletDetails, setWalletDetails] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  //  useeffect for get cookies
  useEffect(() => {
    getUserInCookie();
  }, []);

  // useeffect for get biding list
  useEffect(() => {
    setIsLoading(true);
    currentUser && getCoconutData();
    setInterval(() => {
      currentUser && getCoconutData();
    }, 10000);
  }, [currentUser]);

  // get bidding list
  const getCoconutData = () => {
    AddProducts.getApi((res) => {
      if (res) {
        setIsLoading(false);
        setState(res.data.products);
      } else {
        setIsLoading(false);
        navigate(`/page-not-found`);
      }
    });
  };
  // get cookies function
  const getUserInCookie = () => {
    let cookie = WebCookies.GetCookie("userin");
    setCurrentUser(JSON.parse(cookie));
  };

  // add product modall toggle
  const addProductModalToggle = () => {
    setAddProductModaloOpen(!addProductModalOpen);
  };

  // add bidding data API
  const getProductData = (data) => {
    AddProducts.postApi(data, (res) => {
      if (res && res.status === "SUCCESS") {
        toast("Successfully product is added");
        getCoconutData();
        setAddProductModaloOpen();
      }
    });
  };

  // get card time
  const getInterValTime = (time) => {
    setTime(time);
  };

  const getWalletDetails = (data) => {
    setWalletDetails(data?.data?.wallet);
  };

  // spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <NavBar getWalletDetails={getWalletDetails} />
      <ToastContainer />
      {currentUser.role === PRODUCER ? (
        <Container>
          <Row className="mt-3 ">
            <Col
              xs={{ span: 6, offset: 6 }}
              sm={{ span: 8, offset: 8 }}
              md={{ span: 10, offset: 10 }}
              lg={{ span: 12, offset: 12 }}
            >
              <Button variant="success" onClick={addProductModalToggle}>
                + Add Product
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
      <div className="coconut-cards">
        {state && state.length > 0 ? (
          <CoConutCard
            coconutData={state}
            currentUser={currentUser}
            wallet={walletDetails}
            getInterValTime={getInterValTime}
          />
        ) : (
          <NoRecordsFound
            message="No Bid Yet"
            description={`${
              currentUser.role === PRODUCER
                ? "Add Bid Now"
                : "Wait until the producer submits a Bid."
            } `}
          />
        )}
      </div>
      <ProductAddModal
        open={addProductModalOpen}
        toggle={addProductModalToggle}
        getProductData={(e) => getProductData(e)}
      />
    </Fragment>
  );
};

export default ProductsList;
