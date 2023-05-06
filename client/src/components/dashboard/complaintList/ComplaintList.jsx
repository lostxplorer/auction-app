import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavBar from "../../Layouts/NavBar";
import RegisterApi from "../../LoginPages/RegisterApi";

const ComplaintList = () => {
  const [complaintsList, setComplaintsList] = useState([]);

  useEffect(() => {
    getComplaintsList();
  }, []);

  const getComplaintsList = () => {
    RegisterApi.getUserComplaintList(setComplaintsList);
  };

  return (
    <Fragment>
      <NavBar />
      <Container>
        <div className="mt-4 mb-4">
          <h4>User Complaints</h4>
        </div>
        <div className="coconut-cards">
          <div className="row mt-3">
            <div className="col">
              <table className="table table-hover text-center table-striped ">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Sl.No</th>
                    <th>Complaint By</th>
                    <th>Complaint On</th>
                    <th>Product Name</th>
                    <th>Complaint</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {complaintsList?.data?.length > 0 &&
                    complaintsList?.data?.map((complaint, index) => {   
                        console.log(complaint);                  
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{complaint.complaintBy}</td>
                            <td>{complaint.complaintOn}</td>
                            <td>{complaint.productName}</td>
                            <td>{complaint.complaint}</td>                       
                          </tr>
                        );                    
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default ComplaintList;
