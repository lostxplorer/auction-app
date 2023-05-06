import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavBar from "../../Layouts/NavBar";
import RegisterApi from "../../LoginPages/RegisterApi";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = () => {
    RegisterApi.getUsersListApi(setUsersList);
  };

  const deleteUser = (userName) => {
    RegisterApi.deleteUserApi(getUsersList, userName);
  }

  return (
    <Fragment>
      <NavBar />
      <Container>
        <div className="mt-4 mb-4">
          <h4>Users</h4>
        </div>
        <div className="coconut-cards">
          <div className="row mt-3">
            <div className="col">
              <table className="table table-hover text-center table-striped ">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Sl.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usersList?.data?.users.length > 0 &&
                    usersList?.data?.users.map((user, index) => {
                      if (user.role !== "ADMIN") {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                              <div className="remove">
                                <button onClick={() => deleteUser(user._id)}>delete</button>
                              </div>
                            </td>                          
                          </tr>
                        );
                      }
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

export default UserList;
