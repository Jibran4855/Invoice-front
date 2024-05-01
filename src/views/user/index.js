// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader";

import { UserServices } from "services/user";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setLoader } from "store/loader";

import UserTable from "components/tables/userTable";
import AddUserModal from "components/Modals/addUserModal";
import confirm from "reactstrap-confirm";

const User = (props) => {

  const [allUsers, setAllUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  const [userData, setUserData] = useState({});

  const [showUserFormModal, setShowUserFormModal] = useState(false);

  const dispatch = useDispatch();

  const getAllUsers = async () => {
    dispatch(setLoader(true));
    try {
      const getAllUsers = await UserServices.getAllUsers();
      setAllUsers(getAllUsers?.users);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
    }
  };

  const createUser = async (data) => {
    dispatch(setLoader(true));
    try {
      await UserServices.createUser(data);
      getAllUsers()
      setShowUserFormModal(false)
      dispatch(setLoader(false));
    } catch (e) {
      dispatch(setLoader(false));
      console.log({ e });
    }
  };

  const updateUser = async (data) => {
    dispatch(setLoader(true));
    try {
      await UserServices.updateUser(data);
      getAllUsers()
      setShowUserFormModal(false)
      dispatch(setLoader(false));
    } catch (e) {
      dispatch(setLoader(false));
      console.log({ e });
    }
  };

  const getUserRoles = async () => {
    dispatch(setLoader(true));
    try {
      const roles = await UserServices.getUserRoles();
      setAllRoles(roles.roles)

    } catch (e) {
      console.log({ e });
    }
  };

  const handleUserCreateAndUpdate = (operation, data) => {

    switch (operation) {
      case 'create':
        createUser(data)
        break;
      case 'update':
        updateUser(data);
        break;
      default:
        break;
    }

  }

  const openUpdateModal = async (data) => {
    setUserData(data);
    setShowUserFormModal(true);
  };

  const deleteUser = async (id) => {
    try {

      let confirmation = await confirm({
        title: "",
        message:
          "! Are you sure you want to delete this ? Because this action cannot be undone'",
        confirmText: "DELETE",
        confirmColor: "danger",
        cancelColor: "link text-primary",
      });

      if (!confirmation) return false;

      dispatch(setLoader(true));
      await UserServices.deleteUser(id);
      getAllUsers()
      dispatch(setLoader(false));
    } catch (e) {
      dispatch(setLoader(false));
      console.log({ e });
    }
  };

  useEffect(() => {
    getUserRoles()
    getAllUsers()
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="justify-content-between ">
                  <h3 className="mb-0">User List</h3>
                  <AddUserModal
                    showAddModal={showUserFormModal}
                    setShowAddModal={setShowUserFormModal}
                    setUserData={setUserData}
                    allRoles={allRoles}
                    userData={userData}
                    handleUserCreateAndUpdate={handleUserCreateAndUpdate}
                  />
                </Row>
              </CardHeader>

              <UserTable
                data={allUsers}
                deleteUser={deleteUser}
                openUpdateModal={openUpdateModal}
              />

            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default User;
