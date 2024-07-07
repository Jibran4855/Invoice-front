import { useState, useEffect } from "react";

// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";

import UserHeader from "components/Headers/UserHeader";
import CustomerTable from "components/tables/customerTable";
import AddCustomerModal from "components/Modals/addCustomerModal";

import { CustomerServices } from "services/customer";
import { useDispatch } from "react-redux";
import { setLoader } from "../../store/loader";
import { setError, setSuccess } from "../../store/alert";
import confirm from "reactstrap-confirm";

const Customer = (props) => {
  const [customers, setCustomers] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [customerData, setCustomerData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCustomers();
  }, []);

  const openUpdateModal = async (data) => {
    setCustomerData(data);
    setShowAddModal(true);
  };

  const getAllCustomers = async () => {
    try {
      dispatch(setLoader(true));
      const response = await CustomerServices.getAllCustomers();
      setCustomers(response.data);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const createCustomer = async (data) => {
    try {
      dispatch(setLoader(true));
      const response = await CustomerServices.create(data);
      dispatch(setLoader(false));
      dispatch(setSuccess(response.message));
      setShowAddModal(false)
      getAllCustomers();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const updateCustomer = async (data) => {
    try {
      dispatch(setLoader(true));
      const updateSpecialist = await CustomerServices.update(data);
      dispatch(setSuccess(updateSpecialist.message));
      dispatch(setLoader(false));
      setShowAddModal(false);
      getAllCustomers();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const deleteCustomer = async (id) => {
    try {
      let confirmation = await confirm({
        title: "",
        message:
          "! Are you sure you want to delete this ? Because this action cannot be undone",
        confirmText: "DELETE",
        confirmColor: "danger",
        cancelColor: "link text-primary",
      });

      if (!confirmation) return false;

      const response = await CustomerServices.delete(id);
      dispatch(setSuccess(response.message));
      dispatch(setLoader(false));
      getAllCustomers();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const handleCustomerCreateAndUpdate = (operation, data) => {

    switch (operation) {
      case 'create':
        createCustomer(data)
        break;
      case 'update':
        updateCustomer(data);
        break;
      default:
        break;
    }

  }

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
                  <h3 className="mb-0">Customer List</h3>
                  <AddCustomerModal
                    showAddModal={showAddModal}
                    setShowAddModal={setShowAddModal}
                    customerData={customerData}
                    handleCreateAndUpdate={handleCustomerCreateAndUpdate}
                  />
                </Row>
              </CardHeader>

              <CustomerTable
                data={customers}
                openUpdateModal={openUpdateModal}
                delete={deleteCustomer}
              />

            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Customer;
